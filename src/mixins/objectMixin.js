export const objectMixin = {
  data: () => {
    return {
      positionObject: {},
      shapeObject: {},

      clickTop: 0,
      clickLeft: 0,
      scrollTop: 0,

      dragMode: false,
      isXButtonActivated: false,
    };
  },

  computed: {
    zoom() {
      return this.$store.state.editor.zoom;
    },
  },

  methods: {
    onDragStartHandler(event) {
      this.clickLeft = event.x;
      this.clickTop = event.y;
      this.scrollTop = document.getElementsByClassName(
        "editor-pdf-viewer-wrapper"
      )[0].scrollTop;
    },

    onTextMouseUpHandler(event) {
      const pdfLayer = window.getComputedStyle(
        document.getElementsByClassName("pdf-layer")[this.object.page - 1]
      );
      const pdfHeight = pdfLayer.height.split("px")[0];
      const pdfWidth = pdfLayer.width.split("px")[0];

      console.log(pdfWidth);

      if (
        Number(this.positionObject.left.split("px")[0]) +
          this.shapeObject.width >
        pdfWidth
      ) {
        this.shapeObject.width =
          pdfWidth - Number(this.positionObject.left.split("px")[0]);
      }
      if (
        Number(this.positionObject.top.split("px")[0]) +
          this.shapeObject.height >
        pdfHeight
      ) {
        this.shapeObject.height =
          pdfHeight - Number(this.positionObject.top.split("px")[0]) - 15;
      }

      let quotient = this.shapeObject.height / 20;
      this.shapeObject.height = 20 * Math.round(quotient);

      this.shapeObject = {
        ...this.shapeObject,
        width: `${this.shapeObject.width}px`,
        height: `${this.shapeObject.height}px`,
      };
    },

    onSignMouseUpHandler(event) {
      const pdfLayer = window.getComputedStyle(
        document.getElementsByClassName("pdf-layer")[this.object.page - 1]
      );
      const pdfHeight = pdfLayer.height.split("px")[0];
      const pdfWidth = pdfLayer.width.split("px")[0];

      if (
        Number(this.positionObject.left.split("px")[0]) +
          this.shapeObject.width >
        pdfWidth
      ) {
        this.shapeObject.width =
          pdfWidth - Number(this.positionObject.left.split("px")[0]);
      }
      if (
        Number(this.positionObject.top.split("px")[0]) +
          this.shapeObject.height >
        pdfHeight
      ) {
        this.shapeObject.height =
          pdfHeight - Number(this.positionObject.top.split("px")[0]) - 15;
      }

      this.shapeObject = {
        ...this.shapeObject,
        width: `${this.shapeObject.width}px`,
        height: `${this.shapeObject.height}px`,
      };
    },

    onMouseEnterHandler(event) {
      this.isXButtonActivated = true;
    },

    onMouseLeaveHandler(event) {
      this.isXButtonActivated = false;
    },

    xButtonClickHandler(object, event) {
      switch (object.object_type) {
        case "OBJECT_TYPE_TEXT":
          this.$store.commit("DELETE_TEXT_OBJECT", object);
          break;
        case "OBJECT_TYPE_CHECKBOX":
          this.$store.commit("DELETE_CHECKBOX_OBJECT", object);
          break;
        case "OBJECT_TYPE_SIGN":
          this.$store.commit("DELETE_SIGN_OBJECT", object);
          break;
      }
    },

    onDragEndHandler(event) {
      if (!this.isEditable) return;
      let gapX = event.x - this.clickLeft;
      let gapY = event.y - this.clickTop;

      let gapScroll =
        document.getElementsByClassName("editor-pdf-viewer-wrapper")[0]
          .scrollTop - this.scrollTop;

      let pdfHeight = window
        .getComputedStyle(
          document.getElementsByClassName("pdf-layer")[this.object.page - 1]
        )
        .height.split("px")[0];
      let pdfWidth = window
        .getComputedStyle(
          document.getElementsByClassName("pdf-layer")[this.object.page - 1]
        )
        .width.split("px")[0];

      const finalPositionX =
        Number(this.positionObject.left.split("px")[0]) +
        gapX * (100 / this.zoom);
      const finalPositionY =
        Number(this.positionObject.top.split("px")[0]) +
        (gapY + gapScroll) * (100 / this.zoom);
      if (
        finalPositionX < 0 ||
        finalPositionX + this.object.width > pdfWidth ||
        finalPositionY < -12 ||
        finalPositionY + this.object.height > pdfHeight
      )
        return;

      this.positionObject = {
        top: `${finalPositionY}px`,
        left: `${finalPositionX}px`,
      };

      this.$store.commit(
        `UPDATE_${this.object.object_type.split("_")[2]}_OBJECT`,
        {
          ...this.object,
          x_position: finalPositionX,
          y_position: finalPositionY,
        }
      );
    },

    onDragOverHandler(event) {
      event.preventDefault();
    },

    onResizeHander(event) {
      console.log(event);
    },
  },
};
