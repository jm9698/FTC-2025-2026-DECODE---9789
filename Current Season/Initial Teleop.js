package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.util.Range;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import java.lang.Math;

@TeleOp(name = "Telop 2025-2026")
public class Drivetrain extends LinearOpMode {

  private DcMotor backleft;
  private DcMotor backright;
  private DcMotor frontleft;
  private DcMotor frontright;

  // previous power for simple slew-rate limiting
  private double prevLeftPower = 0.0;
  private double prevRightPower = 0.0;
  
  /**
   * This function is executed when this Op Mode is selected from the Driver Station.
   */
  @Override
  public void runOpMode() {
    backleft = hardwareMap.get(DcMotor.class, "backleft");
    backright = hardwareMap.get(DcMotor.class, "backright");
    frontleft = hardwareMap.get(DcMotor.class, "frontleft");
    frontright = hardwareMap.get(DcMotor.class, "frontright");

    backleft.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    frontleft.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    backright.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    frontright.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    
    waitForStart();
    if (opModeIsActive()) {
      backleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      //Initalize Servo positions here

      // deadzone and slew settings
      final double DEADZONE = 0.05;       // joystick noise threshold
      final double MAX_DELTA = 0.04;      // max change in power per loop (tweak for responsiveness)
      
      // Put run blocks here.
      
      while (opModeIsActive()) {
        // Put loop blocks here.
        
        double leftStick = gamepad1.left_stick_y;
        double rightStick = gamepad1.right_stick_y;

        leftStick = (Math.abs(leftStick) < DEADZONE) ? 0.0 : leftStick;
        rightStick = (Math.abs(rightStick) < DEADZONE) ? 0.0 : rightStick;

        double targetLeft = 0.75 * leftStick;
        double targetRight = 0.75 * rightStick;

        double leftDelta = targetLeft - prevLeftPower;
        if (leftDelta > MAX_DELTA) leftDelta = MAX_DELTA;
        if (leftDelta < -MAX_DELTA) leftDelta = -MAX_DELTA;
        double appliedLeft = prevLeftPower + leftDelta;

        double rightDelta = targetRight - prevRightPower;
        if (rightDelta > MAX_DELTA) rightDelta = MAX_DELTA;
        if (rightDelta < -MAX_DELTA) rightDelta = -MAX_DELTA;
        double appliedRight = prevRightPower + rightDelta;
        
        // Apply to motors (tank drive)
        backright.setPower(appliedRight);
        frontright.setPower(appliedRight);
        backleft.setPower(appliedLeft);
        frontleft.setPower(appliedLeft);

        // Store for next loop
        prevLeftPower = appliedLeft;
        prevRightPower = appliedRight;
        
      telemetry.addData("stick L/R", "%.3f / %.3f", leftStick, rightStick);
        telemetry.addData("target L/R", "%.3f / %.3f", targetLeft, targetRight);
        telemetry.addData("applied L/R", "%.3f / %.3f", appliedLeft, appliedRight);
        telemetry.addData("FL Pow", frontleft.getPower());
        telemetry.addData("FR Pow", frontright.getPower());
        telemetry.addData("BL Pow", backleft.getPower());
        telemetry.addData("BR Pow", backright.getPower());
        telemetry.update();
    }
  }
}
}
