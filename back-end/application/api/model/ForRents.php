<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/7/7 0007
 * Time: 下午 2:16
 */

namespace app\api\model;


use think\Model;

class ForRents extends Model
{
    public function Utilities(){
        return $this->hasOne('forRentsUtilities','for_rents_id','id');
    }
}