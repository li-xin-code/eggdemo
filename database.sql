create database ticketing_system;
use ticketing_system;

create table room
(
    id      bigint      not null auto_increment primary key,
    room_no varchar(20) not null comment '房间号',
    seats   varchar(20) not null comment '座位列表',
    unique index uni_room_room_no (room_no)
) comment '放映室';

create table show_schedule
(
    id              bigint      not null auto_increment primary key,
    move_name       varchar(20) not null comment '电影名称',
    start_date      datetime    not null comment '开始放映时间',
    room_id         bigint      not null comment '房间号',
    ticket_quantity int         not null comment '剩余票量'
) comment '上映表';

create table sell_record
(
    id      bigint     not null auto_increment primary key,
    show_id bigint     not null comment '场次id（show_schedule.id）',
    seat_no varchar(4) not null comment '座位号'
) comment '售票记录';