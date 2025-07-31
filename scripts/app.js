'use strict'

import { startNewModelForm } from "./forms/newModel.js"
import { model } from "./models/modelo.js"

const app = {
    start(){
        startNewModelForm(new model())
    }
}

export { app }