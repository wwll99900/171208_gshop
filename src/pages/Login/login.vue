<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">甜心外卖</h2>
        <div class="login_header_title">
          <!-- class=on 控制样式 -->
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <!-- 点击登录提交 所有要提交的数据都和v-model绑定-->
        <form @submit.prevent="login">
          <!-- 与上面一致 true块元素，false隐藏-->
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <!-- 1开头，11位动态class触发，颜色变成黑色；满足条件不禁用，不满足条件禁用，禁用点击就会无效；点击触发请求验证码,form里面点击事件都会提交，所以要阻止默认事件;倒计时判断-->
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{right_phone:rightPhone}"
                @click.prevent="getCode"
              >{{computeTime>0 ?`已发送(${computeTime}s)`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <!-- 与上面一致 true块元素，false隐藏-->
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <!--控制密码显示隐藏 v-if  点击下面的switch_button切换 -->
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">

                <!-- 控制密码右边样式 -->
                <div class="switch_button" :class="showPwd ? 'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <!-- 打开页面就请求验证码，点击也会触发 -->
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha" ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-icon_jiantou"></i>
      </a>
    </div>

    <!-- 信息错误弹出组件 -->
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </section>
</template>


<script>
import AlertTip from "../../components/AlertTip/AlertTip";
// 获取api文件夹index.js三个接口方法  引入js只需要到文件夹这一层就可以
import { reqSendCode, reqPwdLogin, reqSmsLogin } from "../../api";
export default {
  data() {
    return {
      loginWay: true, //true为短信登录，false为密码登录
      computeTime: 0, //倒计时初始值
      showPwd: false, //是否显示密码
      phone: "", //手机号
      pwd: "", //密码
      code: "", //短信验证码
      name: "", //用户名
      captcha: "", //图形验证码
      alertText: "", //提示文本
      alertShow: false //是否显示警告框
    };
  },
  computed: {
    rightPhone() {
      // 正则test验证，满足条件为true,1开头，11位
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    // 异步获取短信验证码
    async getCode() {
      // 如果当前没有计时  computeTime默认为0，为0时没有计时，点击倒计时生效。主要控制点击什么时候生效
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 30;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            //  停止计时
            clearInterval(this.intervalId);
          }
        }, 1000);
        // 发送ajax请求(向指定手机号发送验证码短信)
        const result = await reqSendCode(this.phone);
        if (result.code === 1) {
          //短信验证码发送失败
          //  显示提示警示框
          this.showAlert(result.msg);
          // 停止计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }
      }
    },
    //把下面触发警告框内容封装成方法
    showAlert(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
    },
    //异步登录 表单提交触发
   async login() {
     let result
      //  前台验证
      if (this.loginWay) {//如果是短信验证码登录
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {//手机号正则验证没通过
          //1开头，11位
          // 手机号错误   下面给组件传值
          this.showAlert("手机号不正确");
          return
        } else if (!/^\d{6}$/.test(this.code)) {
          // 验证必须是6位数字
          this.showAlert("验证必须是6位数字");
          return
        }
          //手机和验证码都通过  发送ajax请求短信登录
          result=await reqSmsLogin(phone,code)
        //  if(result.code===0){//登录成功   user就是登录名框输入的值，这里保存起来
        //     const user=result.data
        //  }else{//登录失败
        //     const msg=result.msg
        //  }   
      } else {
        //密码登录
        const { name, pwd, captcha } = this;
        if (!this.name) {
          // 验证码必须指定
          this.showAlert("验证码必须指定");
          return
        } else if (!this.pwd) {
          // 密码必须指定
          this.showAlert("密码必须指定");
          return
        } else if (!this.captcha) {
          // 验证码必须指定
          this.showAlert("验证码必须指定");
          return
        }
        //上面都通过  发送ajax请求密码登录
         result=await reqPwdLogin({name,pwd,captcha})       
     }
         // 停止计时  都验证成功
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
      // 根据结果数据处理
        if(result.code===0){//登录成功   user就是登录名框输入的值，这里保存起来
            const user=result.data
            // 将user保存到vuex的state
            this.$store.dispatch('recordUser',user)
            // 去个人中心界面
            this.$router.replace('/profile')
         }else{//登录失败
            const msg=result.msg
            // 触发图片验证码请求
            this.getCaptcha()
            // 触发提示框
            this.showAlert(msg)
         }   
    },
    // 关闭警告框
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    //点击 获得新的图形验证码
    getCaptcha() {
      // 时间不一样，点击触发   src是jsonp，不存在跨域
      this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now();
    }
  },
  components: {
    AlertTip
  }
};
</script>


<style lang="stylus" scoped>
.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.right_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(30px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
