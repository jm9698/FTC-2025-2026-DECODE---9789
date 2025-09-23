package org.firstinspires.ftc.teamcode;

import com.qualcomm.robotcore.eventloop.opmode.Autonomous;
import com.qualcomm.robotcore.util.ElapsedTime;
import com.qualcomm.robotcore.eventloop.opmode.LinearOpMode;
import com.qualcomm.robotcore.eventloop.opmode.TeleOp;
import com.qualcomm.robotcore.hardware.DcMotor;
import com.qualcomm.robotcore.hardware.Servo;
import com.qualcomm.robotcore.util.ElapsedTime;

@Autonomous(name = "Auto (First 2025-26 Version)")
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
      //Set other motors' modes as required
      
      //Set inital servo positions as required

    while (opModeIsActive()) {
    if (runtime.seconds() <= 2){
    backleft.setPower(0.3);
    backright.setPower(0.3);
    frontleft.setPower(-0.3);
    frontright.setPower(-0.3);
    }
        telemetry.addData("Frontleft Pow", frontleft.getPower());
        telemetry.addData("Front Right Pow", frontright.getPower());
        telemetry.addData("Back Left Pow", backleft.getPower());
        telemetry.addData("Back Right Pow", backright.getPower());
        telemetry.addData("Right Arm Pow", rightarm.getPower());
        telemetry.addData("Left Arm Pow", leftarm.getPower());
        //Add any extra telemetry
        telemetry.addData("Runtime", runtime.toString());
        telemetry.update();
}
}
}
}
