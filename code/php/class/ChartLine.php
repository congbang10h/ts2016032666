<?php

class ChartLine
{
    private static $type = ['cross','circle','square','triangle','diamond','plus'];
    private static $color = ['#E3B505','#610345','#107E7D','#044B7F','#95190C'];
    private static $start = 0;
    public static function get()
    {
        $i = self::$start++;
        return [
            'type' => self::$type[$i % count(self::$type)],
            'color' => self::$color[$i % count(self::$color)]
        ];
    }
}