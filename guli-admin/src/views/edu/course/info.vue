<template>
  <div class="app-container"><h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder="实例： "/>
      </el-form-item>
      <!-- 所属分类 TODO -->
      <!-- 课程分类 -->
      <!-- 一级分类-->
      <el-form-item label="课程分类">
        <el-select
          v-model="courseInfo.subjectParentId"
          placeholder="一级分类" @change="subjectLevelOneChanged">
          <el-option
            v-for="subject in subjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option
            v-for="subject in subjectTwoList"
            :key="subject.id "
            :label="subject.title"
            :value="subject.id"/>
        </el-select>
      </el-form-item>


      <!-- 课程讲师 TODO -->
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select
          v-model="courseInfo.teacherId"
          placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程总时数"/>

      </el-form-item>

      <!-- 课程简介 TODO -->

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>
      <!-- 课程封面 TODO -->
      <!-- 课程封面-->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="BASE_API+'/eduoss/fileoss'"
          class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from "../../../api/edu/course";
import subject from "../../../api/edu/subject";
import Tinymce from "../../../components/Tinymce";

export default {
  components: {Tinymce},
  name: "info",
  data() {
    return {
      saveBtnDisabled: false,
      courseInfo: {
        title: '',
        subjectParentId: '', //一级分类id
        subjectId: '',//二级分类id
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '/static/02.png',
        price: 0
      },
      BASE_API: process.env.BASE_API, // 接口API地址
      teacherList: [],
      subjectOneList: [],//一级分类
      subjectTwoList: []//二级分类
    }
  },
  created() {
    this.getListTeacher()
    this.getOneSubject()
  },
  methods: {
    saveOrUpdate() {
      course.addCourseInfo(this.courseInfo)
        .then(response => {
          //  提示
          this.$message({
            type: 'sucess',
            message: '添加课程信息成功'
          })

          //跳转到第二步
          this.$router.push({path: '/course/chapter/' + response.data.courseID})
        })

    },
    //查询所有的讲师
    getListTeacher() {
      course.getListTeacher()
        .then(response => {
          this.teacherList = response.data.items
        })
    },
    subjectLevelOneChanged(value) {
      //value就是一级分类id值
      console.log(value)
      //遍历所有的分类,包含一级和二级
      for (var i = 0; i < this.subjectOneList.length; i++) {
        //每个一级分类
        var oneSubject = this.subjectOneList[i]
        //判断:所有一级分类id和点击一级分类id是否一样
        if (oneSubject.id === value) {
          // 分类获取里面所有的二级分类
          this.subjectTwoList = oneSubject.children
          //把二级分类id值清空
          this.courseInfo.subjectId = ''
        }
      }
    },
    //查询所有的一级分类
    getOneSubject() {
      subject.getSubjectList()
        .then(response => {
          this.subjectOneList = response.data.list
        })
    },
    //文件上传成功
    handleAvatarSuccess(res, file) {
      this.courseInfo.cover = res.data.url
    },
    //文件上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }


}

</script>
<style scoped>
.tinymce-container {
  line-height: 20px;
}
</style>

