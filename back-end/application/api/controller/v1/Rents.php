<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/3 0003
 * Time: 下午 12:57
 */
namespace app\api\controller\v1;
use app\api\model\Rents as RentsModel;

class Rents
{
    public function getAllRents(){
        $rents = RentsModel::all();
        return json($rents);
    }

    public function addOneRent($title,$wechat_nickname,$wechat_avater){
        $post_time = date('Y-m-d H:i:s');
        $rent = new RentsModel();
        $rent->data([
            'title'  =>  $title,
            'post_time' =>  $post_time,
            'wechat_nickname' =>  $wechat_nickname,
            'wechat_avater' =>  $wechat_avater,
        ]);
        $rent->save();
        return "success";
    }

}