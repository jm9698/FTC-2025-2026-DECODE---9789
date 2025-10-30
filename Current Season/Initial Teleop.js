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
  private DcMotor leftshoot;
  private DcMotor rightshoot;
  //Added booleans to toggle shoot modes on and off
  private boolean shortshoot;
  private boolean longshoot;

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
    leftshoot = hardwareMap.get(DcMotor.class, "leftshoot");
    rightshoot = hardwareMap.get(DcMotor.class, "rightshoot");

/*
    backleft.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    frontleft.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    backright.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    frontright.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    leftshoot.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    rightshoot.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
*/
    waitForStart();
    if (opModeIsActive()) {
      backleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      leftshoot.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      rightshoot.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
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

        //short-distance shoot
        if (gamepad1.a){
        if (shortshoot = false){
        leftshoot.setPower(-0.45);
        rightshoot.setPower(0.45);
        shortshoot = true;
        longshoot = false;
        }
        else {
        leftshoot.setPower(0);
        rightshoot.setPower(0);
        shortshoot = false;
        };


        //long-distance shoot
        if (gamepad1.y){
        if (longshoot = false){
        leftshoot.setPower(-0.76);
        rightshoot.setPower(0.76);
        longshoot = true;
        shortshoot = false;
        }
        else {
        leftshoot.setPower(0);
        rightshoot.setPower(0);
        longshoot = false;
        }
        };
        
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
        telemetry.addData("LS Pow", leftshoot.getPower());
        telemetry.addData("RS Pow", rightshoot.getPower());
        telemetry.update();
    }
  }
}
}
}
