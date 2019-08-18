export function mockPropsGraphic(){
    window.graphics = {bundle: 'bA', page: 'pA1'}
}

export function mockNodecg(){
    window.nodecg = {
        sendMessage: jest.fn(),
        listenFor: jest.fn()
    }
}

export function mockForBrowser(){
    mockPropsGraphic()
    mockNodecg()
    mockImageClass()
}

export function mockImageClass(){
    global.Image = class ImageMock {
        set src(v){
            this.onload()
        }
    }
}

mockForBrowser()