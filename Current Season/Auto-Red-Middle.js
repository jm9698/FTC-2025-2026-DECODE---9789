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
// Add attachments as required

private ElapsedTime runtime = new ElapsedTime();



@Override
  public void runOpMode() {
    backleft = hardwareMap.get(DcMotor.class, "backleft");
    backright = hardwareMap.get(DcMotor.class, "backright");
    frontleft = hardwareMap.get(DcMotor.class, "frontleft");
    frontright = hardwareMap.get(DcMotor.class, "frontright");
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
      //Set other motors' modes as required
    }
      //Set inital servo positions as required

    while (opModeIsActive()) {
    if (runtime.seconds() <= 2){
    backleft.setPower(0.3);
    backright.setPower(0.3);
    frontleft.setPower(0.3);
    frontright.setPower(0.3);
    }
    //Forward 2 s
    else if (runtime.seconds() <= 5) {
    backleft.setPower(0);
    backright.setPower(0);
    frontleft.setPower(0);
    frontright.setPower(0);
    }
    //Stop 3 s
    else if (runtime.seconds() <= 5.4){
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
    else if (runtime.seconds() <= 8) {
    backleft.setPower(0.3);
    backright.setPower(0.3);
    frontleft.setPower(0.3);
    frontright.setPower(0.3);
    }
    //Stop 1 s
        telemetry.addData("Front left Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        //Add any extra telemetry
        telemetry.addData("Runtime", runtime.toString());
        telemetry.update();
    };
  };
};
