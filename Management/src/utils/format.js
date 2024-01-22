import dayjs from 'dayjs'

export const formatTime = (time) => dayjs(time).format('YYYY-MM-DD HH:mm')
