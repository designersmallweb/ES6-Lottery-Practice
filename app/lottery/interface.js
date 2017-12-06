import $ from 'jquery'
class Interface{
//获取遗漏数据
//issue当前期号
	getOmit(issue){
		let me=this
		return new Promise((resolve,reject)=>{
			$.ajax({
				url:'/get/omit',
				data:{
					issue:issue
				},
				dataType:'json',
				success:function(res) {
					me.setOmit(res.data)
					resolve.call(me,res)
				},
				error:function(err) {
					reject.call(err)
				}
			})
		})
	}
	//获取开奖号码
	getOpenCode(issue){
		let me=this
		return new Promise((resolve,reject)=>{
			$.ajax({
				url: '/get/opencode',
				data: {
					issue:issue
				},
				dataType: 'json',
				success:function(res) {
					me.setOpenCode(res.data)
					resolve.call(me,res)
				},
				error:function(err) {
					reject.call(err)
				}
			})
		})
	}
	//获取当前状态
	getState(issue){
		let me=this
		return new Promise((resolve,reject)=>{
			$.ajax({
				url: '/get/state',
				data: {
					issue:issue
				},
				dataType: 'json',
				success:function(res) {
					resolve.call(me,res)
				},
				error:function(err) {
					reject.call(err)
				}
			})
		})
	}
}
export default Interface