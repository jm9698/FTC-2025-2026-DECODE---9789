package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.util.ElapsedTime;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;

@Autonomous(name = "Auto (Old) (Blocks to Java)")
public class Autos_ftc_copy extends LinearOpMode {

private DcMotor backleft;
private DcMotor backright;
private DcMotor frontleft;
private DcMotor frontright;
private DcMotor leftarm;
private DcMotor rightarm;
private DcMotor linearslide;
private Servo gclaw;
private Servo rclaw;

private ElapsedTime runtime = new ElapsedTime();



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
    runtime.reset();
waitForStart();
    if (opModeIsActive()) {
      runtime.reset();
      backleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      backright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontleft.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      frontright.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      leftarm.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      rightarm.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      linearslide.setMode(DcMotor.RunMode.RUN_WITHOUT_ENCODER);
      gclaw.setPosition(0);
      rclaw.setPosition(0);

    while (opModeIsActive()) {
    if (runtime.seconds() <= 4){
    backleft.setPower(-0.3);
    backright.setPower(-0.3);
    frontleft.setPower(-0.3);
    frontright.setPower(-0.3);
    }
    else if (runtime.seconds() > 5){
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    
        telemetry.addData("Frontleft Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        telemetry.addData("Runtime", runtime.toString());
        telemetry.update();
}
}
}
}