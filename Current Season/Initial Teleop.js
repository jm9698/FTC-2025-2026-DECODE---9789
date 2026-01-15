/*
Copyright 2025 FIRST Tech Challenge Team 23303

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.util.Range;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import java.lang.Math;

//Gamepad Key
  //Motors
    //Drivetrain Motors -> Tank Drive
    //Launch Motors ->
      //Dpad_Left -> Start
      //Dpad_Right -> Stop
      //Dpad_Up -> Increase Speed
      //Dpad_Down -> Decrease Speed
    //Intake Motor ->
      //Y -> Intake
      //A -> Outtake
  //Servos
    //Flipper ->
      //Right Bumper -> Push Artifact
      //onRelease -> Reset
    //Flicker ->
      //X -> Reset
      //B -> Flick
  
    
@TeleOp(name = "Telop 2025-2026 - Beta")
public class Drivetrainbeta extends LinearOpMode {

  private DcMotor backleft;
  private DcMotor backright;
  private DcMotor frontleft;
  private DcMotor frontright;
  private DcMotor leftshoot;
  private DcMotor rightshoot;
  private DcMotor intake;
  private Servo flicker;
  private Servo flipper;

  // previous power for simple slew-rate limiting
  private double prevLeftPower = 0.0;
  private double prevRightPower = 0.0;
  private double prevShootPower = 0.0;
  private double prevIntakePower = 0.0;

// cooldown to control shootPower increases
  private double Cooldown = 1.0;
  
  // constants for shooting
  private double shortShootPower = 0.58;
  private double longShootPower = 0.58;
  
  //function declarations
  private void moveToPosition(int targetTicks, double power) {
  leftshoot.setTargetPosition(targetTicks);
  rightshoot.setTargetPosition(targetTicks);
  //Add additional cases here to slow down motors when positions are unequal.
  if (leftshoot.getCurrentPosition() > leftshoot.getTargetPosition() && rightshoot.getCurrentPosition() > rightshoot.getTargetPosition(){
  //leftshoot.setPower(0);
  //rightshoot.setPower(0);
  leftshoot.getTargetPosition(leftshoot.getTargetPosition() + targetTicks);
  rightshoot.getTargetPosition(rightshoot.getTargetPosition() + targetTicks);
  }
  else {
  leftshoot.setMode(DcMotor.RunMode.RUN_TO_POSITION);
  rightshoot.setMode(DcMotor.RunMode.RUN_TO_POSITION);
  leftshoot.setPower(-power);
  rightshoot.setPower(power);
  }
  
  }
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
    intake = hardwareMap.get(DcMotor.class, "intake");
    flicker = hardwareMap.get(Servo.class, "flicker");
    flipper = hardwareMap.get(Servo.class, "flipper");

/*
    backleft.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    frontleft.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    backright.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    frontright.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    */
    //leftshoot.setZeroPowerBehavior(ZeroPowerBehavior.COAST);
    //rightshoot.setZeroPowerBehavior(ZeroPowerBehavior.COAST);

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
      //rightshoot.setDirection(DcMotor.Direction.REVERSE);
      //leftshoot.setDirection(DcMotor.Direction.REVERSE);
      //leftshoot.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.COAST);
      //rightshoot.setZeroPowerBehavior(DcMotor.ZeroPowerBehavior.COAST);
      intake.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      //Initalize Servo positions here
      //flicker.setDirection(Servo.Direction.REVERSE);
      flicker.setPosition(0.5);
      flipper.setPosition(0);
    }

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
        
        // Apply to motors (tank drive)
        backright.setPower(appliedRight);
        frontright.setPower(appliedRight);
        backleft.setPower(appliedLeft);
        frontleft.setPower(appliedLeft);

        //short-distance shoot
        /*
        if (gamepad1.a){
        leftshoot.setPower(shortShootPower * -1);
        rightshoot.setPower(shortShootPower);
        prevShootPower = shortShootPower;
        }
        */


        //long-distance shoot
        if (gamepad1.dpad_left){
        //run for 10000 ticks
        moveToPosition(10000, 0.75);
        //leftshoot.setPower(longShootPower * -1);
        //rightshoot.setPower(longShootPower);
        //prevShootPower = longShootPower;
        };

        //stop shooters on dpadDown
        if (gamepad1.dpad_right){
        //leftshoot.setPower(0);
        //rightshoot.setPower(0);
        //prevShootPower = 0;
        moveToPosition(10000, 0);
        }

        //Increase shoot power by 2%
        if (gamepad1.dpad_up){
        leftshoot.setPower(-prevShootPower - 0.02 * Cooldown);
        rightshoot.setPower(prevShootPower + 0.02 * Cooldown);
        Cooldown = 0;
        sleep(1000);
        Cooldown = 1;
        prevShootPower = prevShootPower + 0.02 * Cooldown;
        }

        //Decrease shoot power by 2%
        if (gamepad1.dpad_down){
        leftshoot.setPower(-prevShootPower + 0.02 * Cooldown);
        rightshoot.setPower(prevShootPower - 0.02 * Cooldown);
        Cooldown = 0;
        sleep(1000);
        Cooldown = 1;
        prevShootPower = prevShootPower - 0.02 * Cooldown;
        }

        if (gamepad1.rightBumperWasReleased()){
          flipper.setPosition(0);
          flicker.setPosition(0.5);
        }
        if (gamepad1.right_bumper){
          flipper.setPosition(1);
          flicker.setPosition(0.9);
        }
        /*
        if (gamepad1.x){
          flicker.setPosition(0);
        }
        if (gamepad1.b){
          flicker.setPosition(1);
        }
        */
        
        if (gamepad1.y){
          if (prevIntakePower >= 0){
          intake.setPower(-0.75);
          prevIntakePower = -0.75;
          }
          else if (prevIntakePower < 0){
            intake.setPower(0);
            prevIntakePower = 0;
          }
        }
        if (gamepad1.a){
          if (prevIntakePower <= 0){
          intake.setPower(0.75);
          prevIntakePower = 0.75;
          }
          else if (prevIntakePower > 0){
            intake.setPower(0);
            prevIntakePower = 0;
          }
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
        telemetry.addData("Flick Pos", flicker.getPosition());
        telemetry.addData("Flip Pos", flipper.getPosition());
        telemetry.update();
    }
  }
}
