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
  /**
   * This function is executed when this Op Mode is selected from the Driver Station.
   */
  @Override
  public void runOpMode() {
    backleft = hardwareMap.get(DcMotor.class, "backleft");
    backright = hardwareMap.get(DcMotor.class, "backright");
    frontleft = hardwareMap.get(DcMotor.class, "frontleft");
    frontright = hardwareMap.get(DcMotor.class, "frontright");
    waitForStart();
    if (opModeIsActive()) {
      backleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      //Initalize Servo positions here
      // Put run blocks here.
      
      while (opModeIsActive()) {
        // Put loop blocks here.
        
        double leftSpeed = gamepad1.left_stick_y;
        double rightSpeed = gamepad1.right_stick_y;
        backright.setPower(0.75 * (rightSpeed));
        frontright.setPower(0.75 * (rightSpeed));
        backleft.setPower(0.75 * (leftSpeed));
        frontleft.setPower(0.75 * (leftSpeed));
        
      //negatives may need reversing if direction is incorrect
        telemetry.addData("Front left Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        telemetry.update();
    }
  }
}
}
