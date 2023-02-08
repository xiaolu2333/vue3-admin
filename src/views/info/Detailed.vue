<template>
  <el-form ref="infoForm" label-width="150px">
    <el-form-item label="信息类别">
      <el-select v-model="data.category" placeholder="请选择">
        <el-option
            v-for="item in data.categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="信息标题">
      <el-input v-model="data.title"></el-input>
    </el-form-item>
    <el-form-item label="信息图片">
      <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
      >
        <img v-if="data.imageURL" :src="data.imageURL" class="avatar"/>
<!--        <span v-else class="image-upload-icon">+</span>-->
        <svg-icon
            icon-name="image-upload"
            class="avatar-uploader-icon"
            class-name="InfoDetailed.vue"
        ></svg-icon>
      </el-upload>
    </el-form-item>
    <el-form-item label="发布日期">
      <el-date-picker
          v-model="data.date"
          type="datetime"
          placeholder="选择日期和时间"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="信息内容"></el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="resetForm(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {getCurrentInstance, reactive, ref} from "vue";

export default {
  name: "InfoDetailed",
  setup(props) {
    // 获取当前组件实例
    const instance = getCurrentInstance();
    const message = instance.appContext.config.globalProperties.$message;

    const data = reactive({
      imageURL: "",
      category: "",
      title: "",
      date: "",
      categoryOptions: [
        {
          label: "人工智能",
          value: 0,
        },
        {
          label: "区块链",
          value: 1,
        },
        {
          label: "云计算",
          value: 2,
        },
        {
          label: "大数据",
          value: 3,
        },
        {
          label: "物联网",
          value: 4,
        },
        {
          label: "移动开发",
          value: 5,
        },
        {
          label: "前端开发",
          value: 6,
        },
        {
          label: "后端开发",
          value: 7,
        },
        {
          label: "数据库",
          value: 8,
        },
        {
          label: "运维",
          value: 9,
        },
        {
          label: "测试",
          value: 10,
        },
        {
          label: "UI设计",
          value: 11,
        },
        {
          label: "游戏开发",
          value: 12,
        },
        {
          label: "其他",
          value: 13,
        },
      ],
    })


    // 获取表单实例
    const formRef = ref(null);
    // 重置表单
    const resetForm = ( form ) => {
      if (!form) return;
      form.resetFields();
    }

    // on-success 文件上传成功时的钩子，返回值为上传后的文件信息
    const handleAvatarSuccess = (res, file) => {
      // console.log(res, file);
      data.imageURL = URL.createObjectURL(file.raw);
      message.success("上传成功!");
    };
    // on-error 文件上传失败时的钩子，返回值为上传失败的文件信息
    const handleAvatarError = (err, file, fileList) => {
      // console.log(err, file, fileList);
      message.error("上传失败!");
    };
    // before-upload 文件上传前的钩子，可用于上传文件前的格式校验、限制文件大小、文件个数等
    const beforeAvatarUpload = (file) => {
      // 限制图片格式 JPG/PNG/GIF
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error('上传图片只能是 JPG/PNG/GIF 格式!');
        return false;
      }
      // 限制图片大小为 2MB
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      // 限制图片数量 1
      if (data.imageURL.length > 1) {
        message.error("上传头像图片数量不能超过 1 个!");
        // 不要 return false，否则会阻止重新上传
        // return false;
      }
      return isJPG || isPNG || isGIF && isLt2M;
    };

    return {
      formRef,
      data,
      handleAvatarSuccess,
      handleAvatarError,
      beforeAvatarUpload,
      resetForm,
    };
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
}

</style>
