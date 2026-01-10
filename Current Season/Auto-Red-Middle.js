package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.util.ElapsedTime;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;

@Autonomous(name = "Auto - Red - Middle")
public class Autos extends LinearOpMode {

private DcMotor backleft;
private DcMotor backright;
private DcMotor frontleft;
private DcMotor frontright;
private DcMotor leftShoot;
private DcMotor rightShoot;
private DcMotor intake;
private Servo flipper;
private Servo flicker;
// Add attachments as required

private ElapsedTime runtime = new ElapsedTime();



@Override
  public void runOpMode() {
    backleft = hardwareMap.get(DcMotor.class, "backleft");
    backright = hardwareMap.get(DcMotor.class, "backright");
    frontleft = hardwareMap.get(DcMotor.class, "frontleft");
    frontright = hardwareMap.get(DcMotor.class, "frontright");
    leftShoot = hardwareMap.get(DcMotor.class, "leftShoot");
    rightShoot = hardwareMap.get(DcMotor.class, "rightShoot");
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
      backright.setDirection(DcMotor.Direction.REVERSE);
      frontleft.setDirection(DcMotor.Direction.REVERSE);
      frontright.setDirection(DcMotor.Direction.REVERSE);
      leftShoot.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      rightShoot.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      intake.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      //Set other motors' modes as required
      flipper.setPosition(0);
      flicker.setPosition(0);
    }
      //Set inital servo positions as required

    while (opModeIsActive()) {
    if (runtime.seconds() <= 4){
    backleft.setPower(0.3);
    backright.setPower(0.3);
    frontleft.setPower(0.3);
    frontright.setPower(0.3);
    }
    //Forward 4 s
    else if (runtime.seconds() <= 5) {
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    //Stop 1 s
    else if (runtime.seconds() <= 5.6){
    backleft.setPower(-0.4);
    backright.setPower(0.4);
    frontleft.setPower(-0.4);
    frontright.setPower(0.4);
    }
    //Rotate Right 0.4 s
    else if (runtime.seconds() <= 7) {
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    //Stop 1 s
    else if (runtime.seconds() <= 8) {
    backleft.setPower(0.3);
    backright.setPower(0.3);
    frontleft.setPower(0.3);
    frontright.setPower(0.3);
    }
    else if (runtime.seconds() <= 9.5) {
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    else if (runtime.seconds() <= 10.5) {
    leftshoot.setPower(-0.6);
    rightshoot.setPower(0.6);
    }
    //Allow 2 s to spin up to max speed
    else if (runtime.seconds() <= 12.5) {
    flicker.setPosition(1);
    }
    //Flick top artifact into the launcher and reset after 1 second
    else if (runtime.seconds() <= 13.5) {
    flicker.setPosition(0);
    }
    else if (runtime.seconds() <= 14) {
    intake.setPower(-1);
    }
    else if (runtime.seconds() <= 14.5) {
    flipper.setPosition(1);
    }
    //Run intake and flipper to prevent from getting stuck and launch the second artifact; reset flipper before last ball can launch
    else if (runtime.seconds() <= 15) {
    flipper.setPosition(0);
    }
    else if (runtime.seconds() <= 17) {
    flipper.setPosition(1);
    }
    //Allow a delay for launch motors to spin up, and launch the last ball
    
        telemetry.addData("Front left Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        telemetry.addData("Right Shoot Pow", rightShoot.getPower());
        telemetry.addData("Left Shoot Pow", leftShoot.getPower());
        telemetry.addData("Intake Pow", intake.getPower());
        telemetry.addData("Flipper Pos", flipper.getPower());
        telemetry.addData("Flicker Pos", flicker.getPower());
        //Add any extra telemetry
        telemetry.addData("Runtime", runtime.toString());
        telemetry.update();
    };
  };
};
