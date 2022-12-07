package com.receiveshareintent;


import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Build;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class ReceiveShareIntentModule extends ReactContextBaseJavaModule {
  public final String Log_Tag = "ReceiveShareIntent";

  private final ReactApplicationContext reactContext;
  private ReceiveShareIntentHelper receiveShareIntentHelper;

  public ReceiveShareIntentModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    Application applicationContext = (Application) reactContext.getApplicationContext();
    receiveShareIntentHelper = new ReceiveShareIntentHelper(applicationContext);
  }


  protected void onNewIntent(Intent intent) {
    Activity mActivity = getCurrentActivity();
    if(mActivity == null) { return; }
    mActivity.setIntent(intent);
  }

  @ReactMethod
  public void getFileNames(Promise promise){
    Activity mActivity = getCurrentActivity();
    if(mActivity == null) { return; }
    Intent intent = mActivity.getIntent();
    receiveShareIntentHelper.sendFileNames(reactContext, intent, promise);
    mActivity.setIntent(null);
  }

  @ReactMethod
  public void clearFileNames(){
    Activity mActivity = getCurrentActivity();
    if(mActivity == null) { return; }
    Intent intent = mActivity.getIntent();
    receiveShareIntentHelper.clearFileNames(intent);
  }


  @Override
  public String getName() {
    return "ReceiveShareIntent";
  }
}

