<template xmlns="http://www.w3.org/1999/html">
  <div class="app-container">
    添加讲师
    <br>
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number
          v-model="teacher.sort"
          controls-position="right"
          min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
          数据类型一定要和取出的json中的一致，否则没法回填
          因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="teacher.avatar"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload"
                   @click="imagecropperShow=true">更换头像
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/eduoss/fileoss'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate()">保存
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '../../../api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      teacher: {
        name: '',
        sort: 0,
        level: 1,
        career: '',
        intro: '',
        avatar: 'https://gitee.com/xu-genyin/photo-bed/raw/master/xuxian-1646980064060.jpg-55cee0771f8c40e9.jpg?imageView2/1/w/80/h/80'
      },
      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0,//上传组件key值
      BASE_API: process.env.BASE_API,//获取dev.env.js的地址
      saveBtnDisabled: false // 保存按钮是否禁用,
    }
  },
  created() {
    this.init()
  },
  watch: {
    $route(to, from) {//路有变化的方式  路由发生变化就会执行
      this.init()

    }
  },
  methods: {
    close() { //关闭上传弹框
      this.imagecropperShow = false
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1

    },
    cropSuccess(data) {//上传成功
      this.teacher.avatar = data.url
      this.imagecropperShow = false
      this.teacher.avatar = data.url
// 上传成功后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },
    init() {//判断路径是否有id
      console.log('created')
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getInfo(id)
      } else {
        this.teacher = {}
      }
    },
    //修改讲师的方法
    updateTeacher(teacher) {
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/teacher/table' })
        })
    },
    // 根据讲师id查询方法
    getInfo(id) {
      teacherApi.getTeacherId(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    saveOrUpdate() {
      //判断修改还是添加
      // 根据teacher是否有id
      if (!this.teacher.id) {
        //  添加
        this.saveTeacher()
      } else {
        this.updateTeacher()
      }
      this.saveBtnDisabled = false

    },
    // 添加讲师的方法
    // 保存
    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(response => {
          // 提示信息
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          // 路由跳转
          this.$router.push({ path: '/teacher/table' })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
