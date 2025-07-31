'use strict';
import { configureEditor } from "./scripts/editor.js";
import { addResizableWorkspaces } from "./scripts/resize.js";
import { app } from './scripts/app.js';

configureEditor();
addResizableWorkspaces();

app.start();