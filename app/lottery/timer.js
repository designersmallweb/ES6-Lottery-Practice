class Timer{
	countdown(end,update,handle){
		const now=new Date().getTime()
		const me=this
		if (now-end>0) {
			handle.call(me)
		}else{
			let last_time=end-now
			const day_ms=1000*60*60*24
			const hour_ms=1000*60*60
			const minu_ms=1000*60
			const sec_ms=1000
			let day=Math.floor(last_time/day_ms)
			let hour=Math.floor((last_time-day*day_ms)/hour_ms)
			let minu=Math.floor((last_time-day*day_ms-hour*hour_ms)/minu_ms)
			let sec=Math.floor((last_time-day*day_ms-hour*hour_ms-minu*minu_ms)/sec_ms)
			let arr=[]
			if (day>0) {
				arr.push(`<em>${day}</em>天`)
			}
			if (arr.length||(hour>0)) {
				arr.push(`<em>${hour}</em>时`)
			}
			if (arr.length||minu>0) {
				arr.push(`<em>${minu}</em>分`)
			}
			if (arr.length||sec>0) {
				arr.push(`<em>${sec}</em>秒`)
			}
			me.last_time=arr.join('')
			update.call(me,arr.join(''))
			setTimeout(function() {
				me.countdown(end,update,handle)
			},1000)
		}
	}
}
export default Timer