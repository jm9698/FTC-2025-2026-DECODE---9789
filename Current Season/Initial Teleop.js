package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.hardware.PIDFCoefficients;
import com.qualcomm.robotcore.hardware.configuration.typecontainers.MotorConfigurationType;
import com.qualcomm.robotcore.util.Range;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.DcMotorEx;
import com.qualcomm.robotcore.hardware.Servo;
//import com.qualcomm.robotcore.hardware.configuration.MotorConfigurationType;
//import com.qualcomm.robotcore.hardware.PIDFCoefficients;
import java.lang.Math;


//Controller Map
  //Gamepad1
  //Left + Right Joystick -> Tank Drive
  //Gamepad2
  // Y -> Intake
  // A -> Outtake
  // B -> Stop Intake
  // Left Dpad -> Start Shooter
  // Right Dpad -> Stop Shooter
  // Up Dpad -> Increase Shooter Speed by "1 RPM"
  // Down Dpad -> Decrease Shooter Speed by "1 RPM"
  // Right Bumper -> 
  //  Hold for intake
  //  Release for reset
  
@TeleOp(name = "Telop 2025-2026 - Beta")
public class Drivetrainbeta extends LinearOpMode {

  private DcMotor backleft;
  private DcMotor backright;
  private DcMotor frontleft;
  private DcMotor frontright;
  // change shooter motors to DcMotorEx for velocity control
  private DcMotorEx leftshoot;
  private DcMotorEx rightshoot;
  private DcMotor intake;
  private Servo flicker;
  private Servo flipper;

  // previous power for simple slew-rate limiting
  private double prevLeftPower = 0.0;
  private double prevRightPower = 0.0;
  private double prevShootPower = 0.0;
  private double prevIntakePower = 0.0;

  // cooldown to control shootPower increases
  private double Cooldown = 0.0;

  // shooter velocity control state
  private boolean shooterVelocityActive = false;
  private double shooterTargetRPM = 0.0;
  private boolean prevDpadLeft = false;
  private boolean prevDpadRight = false;

  // TUNE: choose a sensible default RPM for your flywheels; adjust after testing
  private double DEFAULT_SHOOTER_RPM = 27.0; // example starting value, tune for your hardware

  // helper: convert RPM -> encoder ticks per second for this motor
  private double rpmToTicksPerSecond(double rpm, DcMotorEx m) {
    MotorConfigurationType mt = m.getMotorType();
    double ticksPerRev = mt.getTicksPerRev();
    return rpm * ticksPerRev / 60.0;
  }

  // helper: convert measured velocity (ticks/sec) -> RPM
  private double ticksPerSecondToRpm(double ticksPerSecond, DcMotorEx m) {
    MotorConfigurationType mt = m.getMotorType();
    double ticksPerRev = mt.getTicksPerRev();
    return ticksPerSecond * 60.0 / ticksPerRev;
  }

  // start shooter velocity control to targetRPM (edge-triggered)
  private void startShooterRPM(double rpm) {
    shooterTargetRPM = Math.abs(rpm);
    // Optional: tune PIDF coefficients for RUN_USING_ENCODER to get stable velocity control
    // Example (commented): new PIDFCoefficients(kP, kI, kD, kF)
    // PIDFCoefficients pidf = new PIDFCoefficients(5.0, 0.0, 0.0, 0.0);
    // leftshoot.setPIDFCoefficients(DcMotor.RunMode.RUN_USING_ENCODER, pidf);
    // rightshoot.setPIDFCoefficients(DcMotor.RunMode.RUN_USING_ENCODER, pidf);

PIDFCoefficients pidf = new PIDFCoefficients(
    50.0,   // P: High P helps recover from voltage sags quickly
    0.1,    // I: Small I to avoid oscillation
    0.0,    // D: Keep low to avoid noise
    0.2   // F: High feed-forward to maintain velocity
  );
  
  leftshoot.setPIDFCoefficients(DcMotor.RunMode.RUN_USING_ENCODER, pidf);
  rightshoot.setPIDFCoefficients(DcMotor.RunMode.RUN_USING_ENCODER, pidf);
  
    //leftshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    //rightshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);

    // Convert RPM to ticks/sec and use setVelocity. Left is inverted in previous code so send negative.
    double ticksPerSec = rpmToTicksPerSecond(shooterTargetRPM, rightshoot);
    leftshoot.setVelocity(-ticksPerSec);
    rightshoot.setVelocity(ticksPerSec);

    shooterVelocityActive = true;
  }

  // stop shooter velocity control
  private void stopShooterRPM() {
    shooterVelocityActive = false;
    leftshoot.setVelocity(0.0);
    rightshoot.setVelocity(0.0);
    leftshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    rightshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
  }

  @Override
  public void runOpMode() {
    backleft = hardwareMap.get(DcMotor.class, "backleft");
    backright = hardwareMap.get(DcMotor.class, "backright");
    frontleft = hardwareMap.get(DcMotor.class, "frontleft");
    frontright = hardwareMap.get(DcMotor.class, "frontright");
    // get DcMotorEx instances for velocity control
    leftshoot = hardwareMap.get(DcMotorEx.class, "leftshoot");
    rightshoot = hardwareMap.get(DcMotorEx.class, "rightshoot");
    intake = hardwareMap.get(DcMotor.class, "intake");
    flicker = hardwareMap.get(Servo.class, "flicker");
    flipper = hardwareMap.get(Servo.class, "flipper");

    waitForStart();
    if (opModeIsActive()) {
      backleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setDirection(DcMotor.Direction.REVERSE);
      backleft.setDirection(DcMotor.Direction.REVERSE);
      leftshoot.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
      rightshoot.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
      leftshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
      rightshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
      intake.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      flicker.setPosition(0.5);
      flipper.setPosition(0);
    }

    final double DEADZONE = 0.05;
    final double MAX_DELTA = 0.04;

    while (opModeIsActive()) {
      double leftStick = gamepad1.left_stick_y;
      double rightStick = gamepad1.right_stick_y;

      leftStick = (Math.abs(leftStick) < DEADZONE) ? 0.0 : leftStick;
      rightStick = (Math.abs(rightStick) < DEADZONE) ? 0.0 : rightStick;

      double targetLeft = -0.75 * leftStick;
      double targetRight = -0.75 * rightStick;

      double leftDelta = targetLeft - prevLeftPower;
      if (leftDelta > MAX_DELTA) leftDelta = MAX_DELTA;
      if (leftDelta < -MAX_DELTA) leftDelta = -MAX_DELTA;
      double appliedLeft = prevLeftPower + leftDelta;

      double rightDelta = targetRight - prevRightPower;
      if (rightDelta > MAX_DELTA) rightDelta = MAX_DELTA;
      if (rightDelta < -MAX_DELTA) rightDelta = -MAX_DELTA;
      double appliedRight = prevRightPower + rightDelta;

      backright.setPower(appliedRight);
      frontright.setPower(appliedRight);
      backleft.setPower(appliedLeft);
      frontleft.setPower(appliedLeft);

      // Edge-detect D-pad Left to start shooter velocity control; D-pad Right to stop
      if (gamepad2.dpad_left && !prevDpadLeft) {
        // start shooter at DEFAULT_SHOOTER_RPM (tune as needed)
        startShooterRPM(DEFAULT_SHOOTER_RPM);
      }
      if (gamepad2.dpad_right && !prevDpadRight) {
        stopShooterRPM();
      }

      // Optional: show measured RPMs
      double leftVelocityTPS = leftshoot.getVelocity();   // ticks per second
      double rightVelocityTPS = rightshoot.getVelocity(); // ticks per second
      double leftRPM = ticksPerSecondToRpm(Math.abs(leftVelocityTPS), leftshoot);
      double rightRPM = ticksPerSecondToRpm(Math.abs(rightVelocityTPS), rightshoot);

      prevDpadLeft = gamepad1.dpad_left;
      prevDpadRight = gamepad1.dpad_right;

      if (gamepad2.dpad_up){
        Cooldown = 1;
        DEFAULT_SHOOTER_RPM = DEFAULT_SHOOTER_RPM + Cooldown; // NOTE: make DEFAULT_SHOOTER_RPM non-final if you want to change it
        if (shooterVelocityActive) startShooterRPM(DEFAULT_SHOOTER_RPM);
      }
      if (gamepad2.dpadUpWasReleased()){
        Cooldown = 0;
      }
      if (gamepad2.dpad_down){
        Cooldown = 1;
        DEFAULT_SHOOTER_RPM = DEFAULT_SHOOTER_RPM + Cooldown;
        if (shooterVelocityActive) startShooterRPM(DEFAULT_SHOOTER_RPM);
      }
      if (gamepad2.dpadDownWasReleased()){
        Cooldown = 0;
      }

        if (gamepad2.rightBumperWasReleased()){
          flipper.setPosition(0);
          flicker.setPosition(0.5);
        }
        if (gamepad2.right_bumper){
          flipper.setPosition(0.4);
          flicker.setPosition(0.9);
        }
        
        if (gamepad2.y){
          intake.setPower(-0.75);
        }
        if (gamepad2.a){
          intake.setPower(0.75);
        }
        if (gamepad2.b){
          intake.setPower(0);
        }
        // Store for next loop
        prevLeftPower = appliedLeft;
        prevRightPower = appliedRight;
        
      telemetry.addData("stick L/R", "%.3f / %.3f", leftStick, rightStick);
        telemetry.addData("target L/R", "%.3f / %.3f", targetLeft, targetRight);
        telemetry.addData("applied L/R", "%.3f / %.3f", appliedLeft, appliedRight);
        telemetry.addData("Intake Power", intake.getPower());
        telemetry.addData("Previous Intake Power", prevIntakePower);
        telemetry.addData("FL Pow", frontleft.getPower());
        telemetry.addData("FR Pow", frontright.getPower());
        telemetry.addData("BL Pow", backleft.getPower());
        telemetry.addData("BR Pow", backright.getPower());
        telemetry.addData("LS Pow", leftshoot.getPower());
        telemetry.addData("RS Pow", rightshoot.getPower());
        telemetry.addData("Left Position", leftshoot.getCurrentPosition());
        telemetry.addData("Right Position", rightshoot.getCurrentPosition());
        telemetry.addData("Left Target", leftshoot.getTargetPosition());
        telemetry.addData("Right Target", rightshoot.getTargetPosition());
        telemetry.addData("Flick Pos", flicker.getPosition());
        telemetry.addData("Flip Pos", flipper.getPosition());
        telemetry.addData("Shooter Active", shooterVelocityActive);
        telemetry.addData("Left RPM", "%.0f", leftRPM);
        telemetry.addData("Right RPM", "%.0f", rightRPM);
        telemetry.addData("Shooter Active (vel)", shooterVelocityActive);
        telemetry.update();
    }
  }
}
