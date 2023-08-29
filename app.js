const express=require("express");

const body_parser=require('body-parser');

const userRouter=require('./routers/user.routes');
const SupplierRouter=require('./routers/supplier.routes');
const PurchaseRouter=require('./routers/purchase.routes');
const MaterialRouter=require('./routers/material.routes');
const ProductRouter=require('./routers/product.routes');
const CutterAssignRouter=require('./routers/cutter.assign.routes');
const CutterFinishRouter=require('./routers/cutter.finish.routes');
const TailerAssignRouter=require('./routers/tailer.assign.routes');
const TailerFinishRouter=require('./routers/tailer.finish.routes');
const ColorRouter=require('./routers/color.routes');
const FinisherAssignRouter=require('./routers/finisher.assign.routes');
const FinishedRouter=require('./routers/finished.routes');

const app=express()

app.use(body_parser.json());

app.use('/',userRouter);

app.use('/',SupplierRouter);

app.use('/',PurchaseRouter);

app.use('/',MaterialRouter);

app.use('/',ProductRouter);

app.use('/',ColorRouter);

app.use('/',CutterAssignRouter);

app.use('/',CutterFinishRouter);

app.use('/',TailerAssignRouter);

app.use('/',TailerFinishRouter);

app.use('/',FinisherAssignRouter);

app.use('/',FinishedRouter);

module.exports=app;