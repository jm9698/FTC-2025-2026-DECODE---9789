package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.util.ElapsedTime;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;

@Autonomous(name = "Auto (Updated-Testing) (Blocks to Java)")
public class Autos extends LinearOpMode {

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
      //Swap gclaw zeros to ones
      gclaw.setPosition(0);
      rclaw.setPosition(0.5);

    while (opModeIsActive()) {
    if (runtime.seconds() <= 2){
    backleft.setPower(-0.3);
    backright.setPower(-0.3);
    frontleft.setPower(-0.3);
    frontright.setPower(-0.3);
    }
    else if (runtime.seconds() <= 3){
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    else if (runtime.seconds() <= 4){
      linearslide.setPower(-0.6);
    }
    else if (runtime.seconds() <= 5){
      rightarm.setPower(-0.2);
      leftarm.setPower(0.2);
    }
    else if (runtime.seconds() <= 6){
      linearslide.setPower(0);
      rightarm.setPower(0);
      leftarm.setPower(0);
    }
    else if (runtime.seconds() <= 7){
      gclaw.setPosition(0.6);
    }
    else if (runtime.seconds() <= 8){
      rightarm.setPower(-0.2);
      leftarm.setPower(0.2);
      linearslide.setPower(0.6);
    }
    else if (runtime.seconds() <= 9){
      linearslide.setPower(0);
      rightarm.setPower(0);
      leftarm.setPower(0);
    }
    else if (runtime.seconds() <= 10.5){
    backleft.setPower(0.3);
    backright.setPower(0.3);
    frontleft.setPower(0.3);
    frontright.setPower(0.3);
    }
    else if (runtime.seconds() <= 11.65){
    backleft.setPower(-0.5);
    backright.setPower(0.5);
    frontleft.setPower(-0.5);
    frontright.setPower(0.5);
    }
    else if (runtime.seconds() <= 14.5){
    backleft.setPower(-0.3);
    backright.setPower(-0.3);
    frontleft.setPower(-0.3);
    frontright.setPower(-0.3);
    }
    else if (runtime.seconds() <= 14.65){
    backleft.setPower(-0.5);
    backright.setPower(0.5);
    frontleft.setPower(-0.5);
    frontright.setPower(0.5);
    }
    else if (runtime.seconds() <= 15.5){
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    else if (runtime.seconds() <= 16.5){
      rightarm.setPower(-0.4);
      leftarm.setPower(0.4);
      }
    else if (runtime.seconds() <= 17.5){
      linearslide.setPower(-0.6);
      rightarm.setPower(0);
      leftarm.setPower(0);
     }
     else if (runtime.seconds() <= 18.5){
      linearslide.setPower(0);
      rightarm.setPower(0.15);
      leftarm.setPower(-0.15);
     }
     else if (runtime.seconds() <= 19){
      gclaw.setPosition(0.6);
     }
     else if (runtime.seconds() <= 20){
      rightarm.setPower(-0.2);
      leftarm.setPower(0.2);
     }
     else if (runtime.seconds() <= 21){
      rightarm.setPower(0);
      leftarm.setPower(0);
      linearslide.setPower(0.6);
     }
     else if (runtime.seconds() <= 22){
      rightarm.setPower(0.15);
      leftarm.setPower(-0.15);
      linearslide.setPower(0);
     }
     else if (runtime.seconds() <= 22.5){
    rightarm.setPower(0);
    leftarm.setPower(0);
    backleft.setPower(0.5);
    backright.setPower(-0.5);
    frontleft.setPower(0.5);
    frontright.setPower(-0.5);
     }
     else if (runtime.seconds() <= 25.5){
    backleft.setPower(0.3);
    backright.setPower(0.3);
    frontleft.setPower(0.3);
    frontright.setPower(0.3);
     }
     else if (runtime.seconds() <= 26.5){
    backleft.setPower(0.5);
    backright.setPower(-0.5);
    frontleft.setPower(0.5);
    frontright.setPower(-0.5);
     }
     else if (runtime.seconds() <= 27.75){
    backleft.setPower(-0.3);
    backright.setPower(-0.3);
    frontleft.setPower(-0.3);
    frontright.setPower(-0.3);
     }
     else if (runtime.seconds() <= 28.5){
    backleft.setPower(-0.5);
    backright.setPower(0.5);
    frontleft.setPower(-0.5);
    frontright.setPower(0.5);
     }
     else if (runtime.seconds() <= 29){
    rightarm.setPower(-0.4);
    leftarm.setPower(0.4);
    linearslide.setPower(-0.3);
    }
    else if (runtime.seconds() <= 29.5){
    rightarm.setPower(0.15);
    leftarm.setPower(-0.15);
    linearslide.setPower(0);
    }
    else if (runtime.seconds() <= 30){
    rightarm.setPower(0);
    leftarm.setPower(0);
    }
        telemetry.addData("Frontleft Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        telemetry.addData("Right Arm Pow", rightarm.getPower());
        telemetry.addData("Left Arm Pow", leftarm.getPower());
        telemetry.addData("Linearslide Pow", linearslide.getPower());
        telemetry.addData("gClaw Pos", gclaw.getPosition());
        telemetry.addData("rClaw Pos", rclaw.getPosition());
        telemetry.addData("Runtime", runtime.toString());
        telemetry.update();
}
}
}
}