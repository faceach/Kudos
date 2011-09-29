//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// File:            config.js
// Defines:
// Dependencies:
// Description:     this is the Javascript configration file for Zhuomi
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */
/* Config - Begin */

ZM.Config = {

    Url: {
        activate: "./new",
        icons: "/assets/icons/"
    },

	defaultIcon: "/assets/icons/icon_plan.png",

    Msg: {

        Format: {
            mail: "邮箱输入错误，请重试",
            username: "昵称须小于{0}个字符",
            password: "密码必须在6-16个字符之间"
        },

        Valid: {
            mail: "请输入邮箱",
            username: "请输入用户名，以便于日后交流",
            password: "密码不能为空",
            numeric: "请输入数字",
            outside: "超过该计划时间上限"
        }

    },

    Text: {
        hour: "小时",
        minute: "分钟"
    },

    Value: {
        maxUsername: 12
    }


};

var testPlanListData = [
        {
			category: {
            	id: 1,
            	name: "跑步",
            	image: "assets/icons/run.png"
			}
        },
        {
            category: {
				id: 2,
            	name: "减肥",
            	image: "assets/icons/loseweight.png"
			}
        },
        {
            category: {
				id: 3,
            	name: "旅行",
            	image: "assets/icons/travel.png"
			}
        },
        {
			category: {
            	id: 4,
            	name: "学习",
            	image: "assets/icons/study.png"
			}
        },
        {
            category: {
				id: 5,
            	name: "运动",
            	image: "assets/icons/sports.png"
			}
        }
    ];


/* Config - End */