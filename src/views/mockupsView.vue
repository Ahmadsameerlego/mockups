<template>
  <section class="d-flex flex-column">
    <div class="container pt-3">
      <div class="d-flex justify-content-between align-items-center">
        <div class="logo">
          <img src="@/assets/logo.png" alt="" />
        </div>

        <div class="d-flex">
          <div class="mx-4">
            <button class="btn btn-danger" @click.prevent="logout">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="main mt-5">
      <div class="container">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Grid Network
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Loop Network
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Digital Street
            </button>
          </li>

          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact"
              type="button"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >
              Airport
            </button>
          </li>

        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            ...
          </div>
          <div
            class="tab-pane fade"
            id="contact"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            ...
          </div>
        </div>
      </div>

      <!-- Main Image Container -->
      <div class="image-container" ref="imageContainer">
        <!-- Main image (dynamically changing) -->
        <img :src="mainImage.src" alt="Main Image" class="main-image" />

        <!-- Overlay for the uploaded file -->
        <template v-if="uploadedFileType === 'image'">
          <!-- If uploaded file is an image, render it as an image -->
          <img
            :src="uploadedImage"
            alt="Uploaded Image"
            class="overlay-image"
            v-if="uploadedImage"
            :style="{
              width: mainImage.overlayWidth + '%',
              height: mainImage.overlayHeight + 'px',
              left: mainImage.overlayLeft + '%',
              top: mainImage.overlayTop + 'px',
              clipPath: mainImage.path,
            }"
          />
        </template>
        <template v-else-if="uploadedFileType === 'video'">
          <!-- If uploaded file is a video, render it as a video -->
          <video
            ref="videoElement"
            :src="uploadedVideo"
            class="overlay-video overlay-image"
            controls
            autoplay
            v-if="uploadedVideo"
            :style="{
              width: mainImage.overlayWidth + '%',
              height: mainImage.overlayHeight + 'px',
              left: mainImage.overlayLeft + '%',
              top: mainImage.overlayTop + 'px',
              clipPath: mainImage.path,
            }"
          ></video>
        </template>

        <!-- Upload new file input -->
        <input type="file" class="input-file" @change="onFileChange" />
      </div>

      <div class="thumbnails" style="margin-bottom: 20px">
        <!-- Download Button with fade-in animation -->
        <button
          v-if="isFileUploaded"
          @click="downloadFile"
          class="download-button fade-in"
        >
          Download File
        </button>
      </div>

      <!-- Thumbnails of images -->
      <div class="thumbnails">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="thumbnail"
          @click="changeMainImage(image)"
        >
          <img :src="image.src" alt="Thumbnail Image" />
        </div>
      </div>
    </div>
  </section>
  <Toast />
</template>
<script>
import html2canvas from "html2canvas";
import axios from "axios";
import image1 from "@/assets/denemark/1.png";
import image2 from "@/assets/denemark/2.png";
import image3 from "@/assets/denemark/3.png";
import image4 from "@/assets/denemark/4.png";
import image5 from "@/assets/denemark/5.png";
import image6 from "@/assets/denemark/6.png";
import image7 from "@/assets/denemark/7.png";
import image8 from "@/assets/denemark/8.png";
import image9 from "@/assets/denemark/9.png";
import image10 from "@/assets/denemark/10.png";
import Toast from "primevue/toast";

// import mergeImages from "merge-images";

export default {
  data() {
    return {
      // The currently selected main image (starts as the first image)
      mainImage: {
        src: image1,
        overlayWidth: 14,
        overlayHeight: 282,
        overlayLeft: 47,
        overlayTop: 8, // Default top position for the uploaded image
        path: "polygon(0% 0%, 0% 90%, 44% 90%, 97% 91%, 99% 0%, 39% 0%)",
      },
      isFileUploaded: false,
      uploadedFileType: "", // Tracks if it's an image or video
      uploadedImage: "", // Stores uploaded image as base64
      uploadedVideo: "", // Stores uploaded video as URL
      videoDuration: 10, // Set video duration (in seconds)
      videoFPS: 30, // Frames per second for the video

      images: [
        {
          src: image1,
          overlayWidth: 14,
          overlayHeight: 282,
          overlayLeft: 47,
          overlayTop: 8,
          path: "polygon(0% 0%, 0% 90%, 44% 90%, 97% 91%, 99% 0%, 39% 0%)",
        },
        {
          src: image2,
          overlayWidth: 15,
          overlayHeight: 347,
          overlayLeft: 51.3,
          overlayTop: 18,
          path: "polygon(1% 6%, 0% 90%, 51% 90%, 114% 89%, 143% 20%, 115% -1%)",
        },
        {
          src: image3,
          overlayWidth: 9,
          overlayHeight: 505,
          overlayLeft: 52.3,
          overlayTop: 29,
          path: "polygon(0% 5%, 3% 90%, 93% 90%, 90% 0, 0 0%, 0 0%)",
        },
        {
          src: image4,
          overlayWidth: 12.3,
          overlayHeight: 279,
          overlayLeft: 42,
          overlayTop: 21,
          path: "polygon(-6% 7%, -1% 89%, 62% 89%, 156% 88%, 165% 39%, 100% 3%)",
        },

        {
          src: image5,
          overlayWidth: 27.1,
          overlayHeight: 208,
          overlayLeft: 40.5,
          overlayTop: 78,
          path: "polygon(0% 8%, 0% 90%, 100% 91%, 100% 12%, 0% 8%, 22% 38%)",
        },
        {
          src: image6,
          overlayWidth: 33.6,
          overlayHeight: 261,
          overlayLeft: 40.5,
          overlayTop: 34,
          path: "polygon(0% 13%, 0% 90%, 109% 89%, 100% 12%, 0% 13%, 20% 53%)",
        },
        {
          src: image7,
          overlayWidth: 26.8,
          overlayHeight: 324,
          overlayLeft: 37,
          overlayTop: 0,
          path: "polygon(27% 0%, 26% -1%, 67% 20%, 178% 80%, 100% 101%, 29% 89%, 0% 94%, 0% 13%)",
        },
        {
          src: image8,
          overlayWidth: 26.9,
          overlayHeight: 199,
          overlayLeft: 38.2,
          overlayTop: 51,
          path: "polygon(32% -6%, 19% 0%, 94% 24%, 95% 98%, 59% 95%, 20% 90%, 0% 95%, 0% 12%)",
        },
        {
          src: image9,
          overlayWidth: 46,
          overlayHeight: 454,
          overlayLeft: 40.7,
          overlayTop: -19,
          path: "polygon(2% 38%, 46% 15%, 77% -1%, 60% -1%, 90% 16%, 92% 17%, 96% 98%, 70% 96%, -86% 109%, 25% 117%, -22% 98%, 0% 103%)",
        },
      ],
    };
  },
  methods: {
    async logout() {
      const fd = new FormData();
      await axios
        .post("logout", fd, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Response:", response);
          this.$toast.add({
            severity: "success",
            summary: "Signned In Successfully",
            life: 3000,
          });
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setTimeout(() => {
            this.$router.push("/");
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
          this.$toast.add({
            severity: "error",
            summary: error.response.data.message,
            life: 3000,
          });
        });
    },
    changeMainImage(image) {
      this.mainImage = image;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const fileType = file.type.split("/")[0];
        if (fileType === "image") {
          this.handleImageUpload(file);
        } else if (fileType === "video") {
          this.handleVideoUpload(file);
        }
      }
    },
    handleImageUpload(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.uploadedFileType = "image";
        this.resizeUploadedImage(event.target.result);
        this.isFileUploaded = true;
      };
      reader.readAsDataURL(file);
    },
    handleVideoUpload(file) {
      this.uploadedFileType = "video";
      this.uploadedVideo = URL.createObjectURL(file);
      this.isFileUploaded = true;
    },
    resizeUploadedImage(src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const aspectRatio = img.width / img.height;
        let newWidth = this.mainImage.overlayWidth;
        let newHeight = this.mainImage.overlayHeight;
        if (img.width > img.height) {
          newHeight = newWidth / aspectRatio;
        } else {
          newWidth = newHeight * aspectRatio;
        }
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        this.uploadedImage = canvas.toDataURL();
      };
    },
    async downloadFile() {
      if (this.uploadedFileType === "image") {
        // For images, download using html2canvas as before
        html2canvas(this.$refs.imageContainer).then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "merged-image.png";
          link.click();
        });
      } else if (this.uploadedFileType === "video") {
        // For videos, record video with overlay using canvas
        await this.recordVideoWithOverlay();
      }
    },
    async recordVideoWithOverlay() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const videoElement = this.$refs.videoElement;
      canvas.width = this.$refs.imageContainer.offsetWidth;
      canvas.height = this.$refs.imageContainer.offsetHeight;

      const stream = canvas.captureStream(this.videoFPS);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);

        // Create a download link for the video
        const link = document.createElement("a");
        link.href = videoUrl;
        link.download = "overlayed-video.mp4";
        link.click();
      };

      mediaRecorder.start();

      // Draw frames onto the canvas for the duration of the video
      const renderFrame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the main image
        const img = new Image();
        img.src = this.mainImage.src;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw the video frame
        if (videoElement.readyState >= 2) {
          ctx.drawImage(
            videoElement,
            this.mainImage.overlayLeft * (canvas.width / 100),
            this.mainImage.overlayTop,
            this.mainImage.overlayWidth * (canvas.width / 100),
            this.mainImage.overlayHeight
          );
        }

        if (!videoElement.paused && !videoElement.ended) {
          requestAnimationFrame(renderFrame);
        }
      };

      videoElement.play();
      renderFrame();

      setTimeout(() => {
        mediaRecorder.stop();
        videoElement.pause();
      }, this.videoDuration * 1000); // Stop after the set duration
    },
  },
  components: {
    Toast,
  },
};
</script>

<style scoped>
.main {
  width: 100vw;
}

.image-container {
  position: relative;
  width: 100vw; /* Adjust based on your main image size */
  height: 600px;
  margin-bottom: 20px;
}
.input-file {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 11;
  opacity: 0;
  top: 0;
  right: 0;
}

/* Main image styling */
.main-image {
  width: 100%;
  height: 100%;
}

/* Uploaded image overlay styling */
.overlay-image {
  position: absolute;
  object-fit: contain;
}

/* Thumbnail container */
.thumbnails {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  gap: 10px;
}

/* Thumbnail styling */
.thumbnail {
  width: 100px;
  height: 80px;
  cursor: pointer;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Button styles */
.download-button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.5s ease-in-out; /* Fade-in effect */
}

.download-button.fade-in {
  opacity: 1;
}
</style>
