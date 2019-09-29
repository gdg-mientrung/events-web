<template>
  <div>
    <h5>Name:</h5>
    <p>{{mentor.name}}</p>
    <h5>Title:</h5>
    <p>{{mentor.title}}</p>
    <p></p>
    <h5>Photo:</h5>
    <p>{{mentor.photo_url}}</p>
    <p></p>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'name',
          {rules: [{ required: true, message: 'Please input name!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="Title" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
          'title',
          {rules: [{ required: true, message: 'Please input title!' }]}
        ]"
        />
      </a-form-item>

      <a-form-item label="Photo" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <div class="dropbox">
          <a-upload
            name="avatar"
            listType="picture-card"
            class="avatar-uploader"
            :showUploadList="false"
            :action="uploadFile"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </div>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  State,
  Action,
  Getter,
  namespace
} from "nuxt-property-decorator";
import { plainToClass } from "class-transformer";
import { Form } from "ant-design-vue";
import { st } from "~/plugins/firebase";
const mentorStore = namespace("mentor");

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

@Component({})
export default class extends Vue {
  @mentorStore.Action fetchMentor;
  @mentorStore.Getter isLoading;
  @mentorStore.Getter mentor;

  formLayout = "horizontal";
  form: any;

  handleSubmit(e) {
    this.$form;
    e.preventDefault();
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }
  handleSelectChange(value) {
    console.log(value);
    this.form.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`
    });
  }

  loading = false;
  imageUrl = "";
  handleChange(info) {
    if (info.file.status === "uploading") {
      this.loading = true;
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.imageUrl = imageUrl;
        this.loading = false;
      });
    }
  }

  beforeUpload(file) {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPG) {
      this.$message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error("Image must smaller than 2MB!");
    }
    return isJPG && isLt2M;
  }
  async uploadFile(file: File) {
    console.log("--------> file.name" + file.name);
    // var storageRef = st.ref('mentor_avatars');
    var storageRef = st.ref();
    var mentorAvatar = storageRef.child(`mentors_avatar/${file.name}`);
    await mentorAvatar.put(file);
  }

  created() {
    this.form = this.$form.createForm(this);
  }
  mounted() {
    this.fetchMentor(this.$route.params.id);
  }
}
</script>

<style>
</style>