<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/7 0007
 * Time: 下午 2:11
 */

namespace app\api\controller\v1;
use app\api\model\ForRents as ForRentsModel;

class ForRents
{
    public function getAllForRents(){
        $forRents = ForRentsModel::with('Utilities')->select();
        return json($forRents);
    }

    public function addOneForRent($uploadFilePaths,$title,$homeType,$address,$price,$period,$weChatNickName,$weChatId,$phone,$email,$weChatAvater,$rentTime,$remarks,$water,$electricity,$Internet,$heat,$pets,$workout,$parking,$swimmingPool){
        date_default_timezone_set('America/Toronto');
        $postTime = date('Y-m-d H:i:s');
        $forRent = new ForRentsModel();
        $forRent->data([
            'title'  =>  $title,
            'homeType' =>  $homeType,
            'address' =>  $address,
            'price' => $price,
            'period' => $period,
            'postTime' => $postTime,
            'weChatNickName' => $weChatNickName,
            'weChatId' => $weChatId,
            'phone' => $phone,
            'email' => $email,
            'weChatAvater' => $weChatAvater,
            'rentTime' => $rentTime,
            'remarks' => $remarks,
            'uploadFilePaths' => $uploadFilePaths
        ]);
        $forRent->save();
        $forRent->Utilities()->save([
            'water' => $water,
            'electricity' => $electricity,
            'Internet' => $Internet,
            'heat' => $heat,
            'pets' => $pets,
            'workout' => $workout,
            'parking' => $parking,
            'swimmingPool' => $swimmingPool
        ]);
        return "success";
    }

    public function upload(){
        date_default_timezone_set('America/Toronto');
        //$file = \think\Image::open(request()->file('file'));
        $file = request()->file('file');
        // 移动到框架应用根目录/public/uploads/ 目录下
        //dump($file);
//        if(!$file){
//            return "false";
//        }
        $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
        if($info){
            // 成功上传后 获取上传信息
            // 输出 jpg
//            echo $info->getExtension();
//            // 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
//            echo $info->getSaveName();
            // 输出 42a79759f284b767dfcb2a0197904287.jpg
            return $info->getFilename();
        }else{
            // 上传失败获取错误信息
            return $file->getError();
        }

    }
}