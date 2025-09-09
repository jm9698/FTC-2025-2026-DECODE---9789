package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.util.Range;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import java.lang.Math;

@TeleOp(name = "Telop 2024-2025 (Blocks to Java)")
public class Drivetrain extends LinearOpMode {

  private DcMotor backleft;
  private DcMotor backright;
  private DcMotor frontleft;
  private DcMotor frontright;
  private DcMotor leftarm;
  private DcMotor rightarm;
  private DcMotor linearslide;
  private Servo gclaw;
  private Servo rclaw;
  /**
   * This function is executed when this Op Mode is selected from the Driver Station.
   */
  @Override
  public void runOpMode() {
    backleft = hardwareMap.get(DcMotor.class, "backleft");
    backright = hardwareMap.get(DcMotor.class, "backright");
    frontleft = hardwareMap.get(DcMotor.class, "frontleft");
    frontright = hardwareMap.get(DcMotor.class, "frontright");
    leftarm = hardwareMap.get(DcMotor.class, "leftarm");
    rightarm = hardwareMap.get(DcMotor.class, "rightarm");
    linearslide = hardwareMap.get(DcMotor.class, "linearslide");
    gclaw = hardwareMap.get(Servo.class, "gclaw");
    rclaw = hardwareMap.get(Servo.class, "rclaw");
    waitForStart();
    if (opModeIsActive()) {
      backleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      leftarm.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      rightarm.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      linearslide.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
     // gclaw.setDirection(Servo.Direction.REVERSE);
      gclaw.setPosition(0);
      rclaw.setPosition(0.5);
      // Put run blocks here.
      while (opModeIsActive()) {
        // Put loop blocks here.
        
        double leftSpeed = gamepad1.left_stick_y;
        double rightSpeed = gamepad1.right_stick_y;
        double leftarmSpeed = gamepad2.left_stick_y;
        double rightarmSpeed = gamepad2.left_stick_y;
        double linearslideSpeed = gamepad2.right_stick_y;

        
        backright.setPower(0.75 * (rightSpeed));
        frontright.setPower(0.75 * (rightSpeed));
        backleft.setPower(0.75 * (leftSpeed));
        frontleft.setPower(0.75 * (leftSpeed));
        if (hangMode = false) {
        leftarm.setPower(-0.6 * java.lang.Math.cbrt(leftarmSpeed));
        rightarm.setPower(0.6 * java.lang.Math.cbrt(rightarmSpeed));
        }
        //Required to ensure consistant power level during hang
        linearslide.setPower(linearslideSpeed);

        if (gamepad2.dpad_left) {
          gclaw.setPosition(0);
        }
        //Closed
        if (gamepad2.dpad_right) {
          gclaw.setPosition(0.6);
        }
        //Open
        if (gamepad2.y) {
          rclaw.setPosition(0.5);
        }
        //Inital
        if (gamepad2.x) {
          rclaw.setPosition(0.177);
        }
        //Spin 90 left
        if (gamepad2.b) {
          rclaw.setPosition(0.833);
        }
        //Spin 90 right
      if (gamepad2.dpad_down) {
        private boolean hangMode = false
        leftarm.setPower(0)
        rightarm.setPower(0)
      }
      //Cancel hanging
      if (gamepad2.dpad_up) {
        private boolean hangMode = true
        leftarm.setPower(-0.6)
        rightarm.setPower(0.6)
      }
      //Enter hang position

      //negatives may need reversing if direction is incorrect
      //boolean method may not work
      telemetry.addData("Frontleft Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        telemetry.addData("Right Arm Pow", rightarm.getPower());
        telemetry.addData("Left Arm Pow", leftarm.getPower());
        telemetry.addData("Linearslide Pow", linearslide.getPower());
        telemetry.addData("gClaw Pos", gclaw.getPosition());
        telemetry.addData("rClaw Pos", rclaw.getPosition());
        telemetry.addData("Hanging?", hangMode.toString());
        telemetry.update();
    }
    }
    }
    }
