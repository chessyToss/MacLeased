<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
use think\Route;

Route::get('api/v1/rents','api/v1.Rents/getAllRents');
Route::post('api/v1/postRent','api/v1.Rents/addOneRent');
Route::get('api/v1/forRents','api/v1.ForRents/getAllForRents');
Route::post('api/v1/postForRents','api/v1.ForRents/addOneForRent');
Route::post('api/v1/postPictures','api/v1.ForRents/upload');