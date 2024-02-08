import dayjs from 'dayjs'

export const formatTime = (time) => dayjs(time).format('YYYY-MM-DD HH:mm')

export const formatDay = (time) => dayjs(time).format('YYYY 年 MM 月 DD 日')
