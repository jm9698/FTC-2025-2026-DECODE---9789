package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.hardware.configuration.typecontainers.MotorConfigurationType;
import com.qualcomm.robotcore.hardware.DcMotorEx;
import com.qualcomm.robotcore.util.ElapsedTime;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.hardware.DcMotorEx;
import com.qualcomm.robotcore.util.ElapsedTime;

@Autonomous(name = "Auto - Red - Middle")
public class Autos1 extends LinearOpMode {

private DcMotor backleft;
private DcMotor backright;
private DcMotor frontleft;
private DcMotor frontright;
private DcMotorEx leftshoot;
private DcMotorEx rightshoot;
private DcMotor intake;
private Servo flipper;
private Servo flicker;
// Add attachments as required
private boolean shooterVelocityActive = false;
private double shooterTargetRPM = 0.0;

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

    leftshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
    rightshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);

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
  
private ElapsedTime runtime = new ElapsedTime();



@Override
  public void runOpMode() {
    backleft = hardwareMap.get(DcMotor.class, "backleft");
    backright = hardwareMap.get(DcMotor.class, "backright");
    frontleft = hardwareMap.get(DcMotor.class, "frontleft");
    frontright = hardwareMap.get(DcMotor.class, "frontright");
    leftshoot = hardwareMap.get(DcMotorEx.class, "leftshoot");
    rightshoot = hardwareMap.get(DcMotorEx.class, "rightshoot");
    intake = hardwareMap.get(DcMotor.class, "intake");
    flipper = hardwareMap.get(Servo.class, "flipper");
    flicker = hardwareMap.get(Servo.class, "flicker");
    //Add attachments to hardwareMap as needed
    runtime.reset();
waitForStart();
    if (opModeIsActive()) {
      runtime.reset();
      backleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backleft.setDirection(DcMotor.Direction.REVERSE);
      //backright.setDirection(DcMotor.Direction.REVERSE);
      frontleft.setDirection(DcMotor.Direction.REVERSE);
      //frontright.setDirection(DcMotor.Direction.REVERSE);
      leftshoot.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
      rightshoot.setMode(DcMotor.RunMode.STOP_AND_RESET_ENCODER);
      leftshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
      rightshoot.setMode(DcMotor.RunMode.RUN_USING_ENCODER);
      intake.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      //Set other motors' modes as required
      flipper.setPosition(0);
      //flicker.setPosition(0);
    }
      //Set inital servo positions as required

    while (opModeIsActive()) {
    if (runtime.seconds() <= 4.1){
    backleft.setPower(-0.3);
    backright.setPower(-0.3);
    frontleft.setPower(-0.3);
    frontright.setPower(-0.3);
    }
    //Forward 4 s
    else if (runtime.seconds() <= 5) {
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    //Stop 1 s
    else if (runtime.seconds() <= 6.2){
    backleft.setPower(0.4);
    backright.setPower(-0.4);
    frontleft.setPower(0.4);
    frontright.setPower(-0.4);
    }
    //Rotate Right 1.1 s
    else if (runtime.seconds() <= 13) {
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    startShooterRPM(25.5);
    }
    //Allow 12.6 s to spin up to max speed
    else if (runtime.seconds() <= 14) {
    intake.setPower(-0.75);
    flipper.setPosition(0.3);
    }
    else if (runtime.seconds() <= 20) {
    flipper.setPosition(0);
    }
    else if (runtime.seconds() <= 21) {
    intake.setPower(0);
    flipper.setPosition(1);
    }
    else if (runtime.seconds() <= 24) {
    flipper.setPosition(0);
    stopShooterRPM();
    }
    // Optional: show measured RPMs
      double leftVelocityTPS = leftshoot.getVelocity();   // ticks per second
      double rightVelocityTPS = rightshoot.getVelocity(); // ticks per second
      double leftRPM = ticksPerSecondToRpm(Math.abs(leftVelocityTPS), leftshoot);
      double rightRPM = ticksPerSecondToRpm(Math.abs(rightVelocityTPS), rightshoot);
    
    //Allow a delay for launch motors to spin up, and launch the last ball
    
        telemetry.addData("Front left Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        telemetry.addData("Right Shoot Pow", rightshoot.getPower());
        telemetry.addData("Left Shoot Pow", leftshoot.getPower());
        telemetry.addData("Intake Pow", intake.getPower());
        telemetry.addData("Flipper Pos", flipper.getPosition());
        telemetry.addData("Flicker Pos", flicker.getPosition());
        telemetry.addData("Left RPM", "%.0f", leftRPM);
        telemetry.addData("Right RPM", "%.0f", rightRPM);
        telemetry.addData("Shooter Active (vel)", shooterVelocityActive);
        //Add any extra telemetry
        telemetry.addData("Runtime", runtime.toString());
        telemetry.update();
    };
  };
};
