class GameObject {
    constructor(renderableObj) {
        this.mRenderComponent = renderableObj;
    }

    getXform() {
        return this.mRenderComponent.getXform();
    }

    update() {

    }

    getRenderable() {
        return this.mRenderComponent;
    }

    draw(aCamera) {
        this.mRenderComponent.draw(aCamera);
    }
}