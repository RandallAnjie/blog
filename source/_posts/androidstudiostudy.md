---
title: 移动应用基础——AndroidStudio编程（未完成）
tags: []
id: '120'
categories:
  - - AndroidStudio
date: 2021-10-15 21:14:25
---

* * *

## 控件

### TextView

```
// MainActivity.java代码设置
public class MainActivity extends AppCompatActivity {

    private TextView text;// 新建TextView类型变量

    @Override
    protected void onCreate(Bundle savedInstanceState) {// 界面设置
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String word = "TEXT";

        text = (TextView) this.findViewById(R.id.textView1);//获取TextViev类型变量对应文本控件的ID，并绑定到text中
        text.setText(word);// 设置文本内容为String类型变量word里的值
    }
}


// layout文件夹下activity_main.xml
<TextView
        android:id="@+id/textView"// 控件id
        android:layout_width="wrap_content"// 控件宽度
        android:layout_height="wrap_content"// 控件高度
        android:text="@string/home_word"// 显示的文本
        android:textColor="#000000"// 文本的颜色
        android:textSize="48sp"// 文本字体大小
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintHorizontal_bias="0.1"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.029999971" />
```

* * *

### Button

```
// MainActivity.java代码设置
public class MainActivity extends AppCompatActivity {

    private TextView text;// 新建TextView类型变量
    private Button button1;// 新建Button类型变量

    @Override
    protected void onCreate(Bundle savedInstanceState) {// 界面设置
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        String word = "TEXT";

        button1 = (Button) this.findViewById(R.id.button);//获取Button类型变量对应按钮控件的ID，并绑定到button1中
        text = (TextView) this.findViewById(R.id.textView1);

        //设置按钮点击监听器MyOnClickListener
        button1.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // 点击后运行的代码写在这
                text.setText(word);// 这里运行点击按钮后更改文本为变量word里的内容
                Toast.makeText(MainActivity.this, "您点击了按钮！", Toast.LENGTH_SHORT).show();// Toast通知
            }
        });
    }
}


// layout文件夹下activity_main.xml
<Button
        android:id="@+id/button"// Button控件的id
        android:layout_width="wrap_content"// Button控件的宽度
        android:layout_height="wrap_content"// Button控件的高度
        android:text="@string/button_word"// Button按钮上的文字
        app:layout_constraintBottom_toTopOf="@+id/up"
        app:layout_constraintEnd_toEndOf="@+id/end"
        app:layout_constraintStart_toStartOf="@+id/start"
        app:layout_constraintTop_toBottomOf="@+id/buttom"
        tools:ignore="MissingConstraints" />
```

* * *

### 进度条

```
// 使用java代码设置
setProgress(int) //设置第一进度
setSecondaryProgress(int) //设置第二进度
getProgress() //获取第一进度
getSecondaryProgress() //获取第二进度
incrementProgressBy(int) //增加或减少第一进度
incrementSecondaryProgressBy(int) //增加或减少第二进度
getMax() //获取最大进度


// layout文件夹下activity_main.xml
<ProgressBar
            android:id="@+id/pb_main_download"
            style="?android:attr/progressBarStyleHorizontal"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:max="100" />
```

* * *

## 功能

### 跳转页面

```
// java文件里实现跳转activity的代码段
Intent intent = new Intent();
intent.setClass(com.example.helloword.MainActivity.this, MainActivity2.class);// 括号里两个变量，第一个为当前activity名称，后一个问要启动的activity的名称
startActivity(intent);


// 新的activity要在AndroidManifest.xml文件里注册
// 可以在新的java文件中public class 文件名 extends AppCompatActivity的文件名处，alt+enter选择Add activity to manifest
<activity
        android:name=".MainActivity2"
        android:exported="false"
        android:parentActivityName=".MainActivity"
        android:label="@string/page2_welcome"/>
//android:exported="true"当前Activity是否可以被另一个Application的组件启动：true允许被启动；false不允许被启动
//android:parentActivityName实现了某个子界面下的左上角返回按钮返回到的页面
//android:label表示了页面上的左上角文字，默认包名
```