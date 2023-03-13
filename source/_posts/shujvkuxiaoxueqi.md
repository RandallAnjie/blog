---
title: 21春数据库系统设计小学期——大学实验材料管理信息系统数据库设计
tags: []
id: '37'
categories:
  - - C#
date: 2021-07-02 06:11:00
---

# 大学实验材料管理信息系统数据库设计
>  **由于本人云服务器系统更新问题，项目后端数据库已经移植，下载后的程序无法连接到数据库，可重构项目并且自行搭建数据库**

*本程序是我都小学期作业，内部肯定存在很多不是最合适的代码跟算法，望大佬指正。最终程序采用云服务器*



[成品链接1](http://startpage.zhuanjie.ltd/download/dxssyclxxglxt.zip)



## 课程设计内容要求
>**设计一个小型数据库（使用Microsoft SQL Server ）** 
（1）数据库来源于对现实世界的抽象和概括，要求设计科学、规范、合理，符合现实情况和实际需求；
（2）数据表的设计要求：关系模式至少要满足第三范式，既具有较低的冗余度，又具有较高的访问效率。要求有六个及以上的表，根据实际操作需要定义合理的索引；
（3）数据库设计的安全性要求：配置SQL Server以支持SQL Server用户身份验证方式，根据实际需要定义合理的用户权限以及用户视图；
（4）数据库设计的完整性要求：要求根据实际需要定义合理的完整性约束（实体完整性、参照完整性以及用户自定义完整性等）；
（5）根据实际情况定义合理的存储过程和触发器；
（6）数据展示系统设计：选择自己熟悉的界面开发工具，将设计的数据库功能（增加、删除、修改、查询）展示出来。

## 前言

>这次课设我的选题是大学实验材料管理信息系统。简单的人工管理和文件系统已经无法应付繁杂的实验材料信息，难以高效整合实验材料信息，从而使实验材料管理费时费力的同时又难以取得理想的效果。而数据库刚好可以弥补人工管理和文件系统的不足。数据库具有许多优点：数据结构化、数据的共享度高，冗余度低、数据独立性高、数据安全性高和便于管理和控制。因此设计大学实验材料管理信息系统进行实验材料管理是十分有意义的。
>数据库设计主要是设计出一个对于学生材料的管理系统。通过分析，规划，该系统分为五大模块。分别为登录页面、注册页面、学生页面、管理员页面、游客页面。其中：登录界面分为学生登录和管理员登录，登录方式可选择姓名登录、学号登录和游客登录；注册界面分为学生注册跟管理员注册（注册的时候要核查数据库内部是否有相同学号工号的用户，如果存在相同值，显示无法注册）；学生界面可以显示信息、借用材料、归还材料和修改账户设置；管理员界面可以显示、修改、添加和删除各个表里的信息；游客界面只能显示目前未借用材料的信息。


## 需求分析

>大学实验材料管理信息系统需要设计出两类人（学生和管理）登录、注册和使用操作的系统。学生要完成获取信息，借用材料，归还材料等操作。管理员要完成对于各个表的管理和修改。
>大学实验材料管理信息系统分别为登录页面、注册页面、学生页面、管理员页面、游客页面。其中：登录界面分为学生登录和管理员登录，登录方式可选择姓名登录、学号登录和游客登录；注册界面分为学生注册跟管理员注册（注册的时候要核查数据库内部是否有相同学号工号的用户，如果存在相同值，显示无法注册）；学生界面可以显示信息、借用材料、归还材料和修改账户设置；管理员界面可以显示、修改、添加和删除各个表里的信息；游客界面只能显示目前未借用材料的信息。


## 概要结构设计

>大学实验材料管理信息系统分别为登录页面、注册页面、学生页面、管理员页面、游客页面。其中：登录界面分为学生登录和管理员登录，登录方式可选择姓名登录、学号登录和游客登录；注册界面分为学生注册跟管理员注册（注册的时候要核查数据库内部是否有相同学号工号的用户，如果存在相同值，显示无法注册）；学生界面可以显示信息、借用材料、归还材料和修改账户设置；管理员界面可以显示、修改、添加和删除各个表里的信息；游客界面只能显示目前未借用材料的信息。
>实验材料管理信息系统数据库在设计功能时,应该从用户的易用性、数据库的安全性和管理员的管理三个方面入手。
用户对于实验材料的借用以及余量的查询，要易于查看，符合直觉设计。拒绝用户删除、修改材料余量、借用历史和借用中等数据。只允许用户更改本人信息。并且要求测试边界条件以防暑假错误损坏数据库。
注册过程分为用户注册和管理员注册。实验材料应该由实验管理员进行管理，为了确保数据库的访问对象时材料管理员，应该设计相应的界面完成登录功能，防止数据库信息被非管理者修改和破坏。
为了更好地进行实验材料的管理，管理员可以查看、修改材料的信息和材料使用的信息。因而要设计材料信息查看、修改和删除功能。材料归实验室所属，而实验室的使用者是班级的学生。为了更好的了解材料的使用情况，应该掌握学生和实验室的信息，通过数据库了解实验室的使用情况。
除此之外，在借用和归还时，应该只可以选择可以操作的材料，更符合设计美学跟使用直觉。
![在这里插入图片描述](https://img-blog.csdnimg.cn/img_convert/b879f1770b20bcf9e39c785cd00198d2.png)




## 数据库字典
### MS表（材料信息）
列名|数据类型|允许NULL值|备注
-|-|-|-
MSNA|nchar(10)|√|材料名称
MSNO|nchar(10)|√|材料编号
MSNU|int|√|材料库存量
MSLNA|nchar(10)|√|实验室名称
MSLNO|nchar(10)|√|实验室编号
MSDP|tinyint|√|是否需要归还：1需要归还；0不需要归还


### MSL表（实验室信息）
列名|数据类型|允许NULL值|备注
-|-|-|-
MSLNA|nchar(10)|√|实验室名称
MSLNO|nchar(10)|√|实验室编号
ADNA|nchar(10)|√|管理员姓名
ADNO|nchar(10)|√|管理员工号


### ST表（学生信息）
列名|数据类型|允许NULL值|备注
-|-|-|-
STNA|nchar(10)|√|学生姓名
STNO|nchar(10)|√|学生学号
STKE|nchar(64)|√|学生密码

### AD表（管理员信息）
列名|数据类型|允许NULL值|备注
-|-|-|-
ADNA|nchar(10)|√|管理员姓名
ADNO|nchar(10)|√|管理员工号
ADKE|nchar(64)|√|管理员密码

### BO表（借用中信息表）
列名|数据类型|允许NULL值|备注
-|-|-|-
STNO|nchar(10)|√|学生学号
MSLNO|nchar(10)|√|实验室编号
MSNO|nchar(10)|√|材料编号
BONU|int|√|借用数量
BODA|nchar(10)|√|借用日期
RTDA|nchar(10)|√|预计归还日期
CODE|nchar(10)|√|核验码

### RE表（借用历史表）
列名|数据类型|允许NULL值|备注
-|-|-|-
STNO|nchar(10)|√|学生学号
MSLNO|nchar(10)|√|实验室编号
MSNO|nchar(10)|√|材料编号
BONU|int|√|借用数量
BODA|nchar(10)|√|借用日期
RTDA|nchar(10)|√|归还日期

## E-R图
>![数据库E-R图](https://img-blog.csdnimg.cn/20210705102826100.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70#pic_center)
## 数据流图
![数据流图](https://img-blog.csdnimg.cn/img_convert/6e9f83d7f5c761f73ead85c305dbf70e.png)

## 代码界面部分（采用VS2019C#语言编写）
### 1.login.cs
代码：
```csharp
/*
 * 21数据库系统设计小学期——大学实验材料管理信息系统数据库设计
 * 
 * 修改时间：2021/7/20
 * 
 * 版本：2.0.2
 * 
 * 作者：转接R
 * 
 * 详细信息：https://blog.csdn.net/RandallChu/article/details/118423456
 * 
 * 21.7.20更新日志：
 * 1.优化数据库，删除部分无用数据库列
 * 2.增加密码加密算法，通过sha256加密算法加密用户密码，将加密后的密码存入数据库
 * 3.更新数据库部分列的表示意义和属性
 * 4.添加了错误操作窗口抖动
 * 
 * 21.7.22更新日志：
 * 1.修复了修改密码报错新旧密码重复的问题
 * 2.利用云端服务器数据库替代本地数据库
 * 
 */

using System;
using System.Data.SqlClient;
using System.Drawing;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Windows.Forms;


namespace 大学实验材料管理信息系统数据库设计
{
    public partial class login : Form
    {
        public static string connectket= "server=/*服务器ip*/;port=1433/*端口*/;user=/*用户名*/;password=/*密码*/;database=大学实验材料管理信息系统数据库设计";
        public login()
        {
            InitializeComponent();
            SqlConnection conn = new(connectket);
            try
            {
                conn.Open();//打开通道，建立连接
                label7.Text = "云端数据库连接成功！";
            }
            catch (SqlException ex)
            {
                MessageBox.Show(ex.Message);  //有异常
                label7.Text = "云端数据库连接失败！请检查网络设置后重新加载程序！";
            }
            conn.Close();
        }


        //全局标识符id
        public static string id;

        //获取今天日期
        public static string today = DateTime.Now.ToString("yyyyMMdd");

        //创建随机标识符
        private static char[] constant = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
        public static string GenerateRandom(int Length)
        {
            System.Text.StringBuilder newRandom = new(62);
            Random rd = new();
            for (int i = 0; i < Length; i++)
            {
                newRandom.Append(constant[rd.Next(62)]);
            }
            return newRandom.ToString();
        }

        //21.7.20——SHA256算法加密密码
        public static string GetSHA256HashFromString(string strData)
        {
            byte[] bytValue = System.Text.Encoding.UTF8.GetBytes(strData);
            try
            {
                SHA256 sha256 = new SHA256CryptoServiceProvider();
                byte[] retVal = sha256.ComputeHash(bytValue);
                StringBuilder stringBuilder = new StringBuilder();
                for (int i = 0; i < retVal.Length; i++)
                {
                    stringBuilder.Append(retVal[i].ToString("x2"));
                }
                return stringBuilder.ToString();
            }
            catch (Exception ex)
            {
                throw new Exception("GetSHA256HashFromString() fail,error:" + ex.Message);
            }
        }

        private void groupBox2_Enter(object sender, EventArgs e)
        {

        }

        private void Form2_Load(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {
            textBox1.Text = "";//清空文本框内容
            textBox2.Text = "";
        }

        private void button6_Click(object sender, EventArgs e)
        {
            textBox3.Text = "";//清空文本框内容
            textBox4.Text = "";
        }

        private void radioButton4_CheckedChanged(object sender, EventArgs e)
        {

        }

        private void button8_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            String UserName, Password;
            UserName = textBox1.Text;
            Password = GetSHA256HashFromString(textBox2.Text.ToString().Trim());
            SqlConnection conn = new(connectket);
            //姓名登录
            if (this.radioButton1.Checked)
            {
                String sql = $"select count(*) from ST where STNA='{this.textBox1.Text}' and STKE = '{Password}'";
                SqlCommand cmd = new(sql, conn);
                SqlDataAdapter adapter = new();
                adapter.SelectCommand = cmd;
                conn.Open();
                //查询返回结果
                int result = (int)cmd.ExecuteScalar();
                if (result == 1)
                {
                    MessageBox.Show("登录成功！");
                    SqlCommand com = new("select STNO from ST where STNA='" + textBox1.Text.Trim() + "'", conn);
                    SqlDataReader dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        id = dr[0].ToString().Trim();
                    }
                    else
                    {
                        id = "none";
                    }
                    dr.Dispose();
                    com.Dispose();
                    this.Hide();
                    student form1 = new();
                    form1.Show();
                }
                else if (result == 0)
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("用户名/密码错误！");
                    textBox2.Text = "";
                }
                else
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("存在重名，请使用学号登录！");
                    textBox1.Text = "";//清空文本框内容
                }
                conn.Close();
            }
            //学号登录
            else if (this.radioButton2.Checked)
            {
                String sql = $"select count(*) from ST where STNO='{this.textBox1.Text}' and STKE = '{Password}'";
                SqlCommand cmd = new(sql, conn);
                SqlDataAdapter adapter = new();
                adapter.SelectCommand = cmd;
                conn.Open();
                //查询返回结果
                int result = (int)cmd.ExecuteScalar();
                conn.Close();
                if (result == 1)
                {
                    MessageBox.Show("登录成功。");
                    id = this.textBox1.Text.Trim();
                    this.Hide();
                    student form1 = new();
                    form1.Show();
                }
                else if (result == 0)
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("学号/密码错误！");
                    textBox2.Text = "";
                }
                else
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("数据库信息错误，请联系管理员！");
                }
            }
            //游客登录
            else if (this.radioButton3.Checked)
            {
                MessageBox.Show("登陆成功！", "提示", MessageBoxButtons.OK);
                this.Hide();
                guider form1 = new();
                form1.Show();
            }
            else
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("请选择登录方式！", "提示", MessageBoxButtons.OK);
            }
        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.Hide();
            register form1 = new();
            form1.Show();
        }

        private void button7_Click(object sender, EventArgs e)
        {
            this.Hide();
            register form1 = new();
            form1.Show();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            String UserName, Password;
            UserName = textBox3.Text;
            Password = GetSHA256HashFromString(textBox4.Text.ToString().Trim());
            SqlConnection conn = new(connectket);
            //姓名登录
            if (this.radioButton4.Checked)
            {
                String sql = $"select count(1) from AD where ADNA='{this.textBox3.Text}' and ADKE = '{Password}'";
                SqlCommand cmd = new(sql, conn);
                SqlDataAdapter adapter = new();
                adapter.SelectCommand = cmd;
                conn.Open();
                //查询返回结果
                int result = (int)cmd.ExecuteScalar();
                if (result == 1)
                {
                    MessageBox.Show("登录成功！");
                    SqlCommand com = new("select ADNO from AD where ADNA='" + textBox3.Text.Trim() + "'", conn);
                    SqlDataReader dr = com.ExecuteReader();
                    if (dr.Read())
                    {
                        id = dr[0].ToString().Trim();
                    }
                    else
                    {
                        id = "none";
                    }
                    dr.Dispose();
                    com.Dispose();
                    this.Hide();
                    Admin form1 = new();
                    form1.Show();
                }
                else
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("用户名/密码错误！");
                    textBox4.Text = "";
                }
                conn.Close();
            }
            //工号登录
            else if (this.radioButton5.Checked)
            {
                String sql = $"select count(1) from AD where ADNO='{this.textBox3.Text}' and ADKE = '{Password}'";
                SqlCommand cmd = new(sql, conn);
                SqlDataAdapter adapter = new();
                adapter.SelectCommand = cmd;
                conn.Open();
                //查询返回结果
                int result = (int)cmd.ExecuteScalar();
                conn.Close();
                if (result == 1)
                {
                    MessageBox.Show("登录成功！");
                    id = this.textBox3.Text.Trim();
                    this.Hide();
                    Admin form1 = new();
                    form1.Show();
                }
                else
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("用户名/密码错误！");
                    textBox4.Text = "";
                }
            }
            else
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("请选择登录方式！", "提示", MessageBoxButtons.OK);
            }
        }
    }
}



```

>登录界面分为学生登录和管理员登录。两种登录方式都分为姓名登录和ID登录，学生登录可以选择游客登录。登陆方式为获取填入文本框的ID、密码和选中的radiobutton，再将这两个值作为关键字传入选中的radiobutton对应的数据库进行比对，返回符合条件数量result。
如果result等于1就登陆成功，获取当前的用户ID存入当前全局静态变量ID中，跳转到radiobutton对应的窗口；如果result等于0就显示登陆失败，抖动登录窗口；对于result大于1的情况，如果姓名登录，显示要求学号/工号登录，如果ID登录，显示数据库错误，数据库信息遭到破坏，需要数据库管理员来修复数据库。

界面截图：
>![登录界面——学生登录](https://img-blog.csdnimg.cn/20210702213106304.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![登录界面——管理员登录](https://img-blog.csdnimg.cn/20210702213154354.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)

### 2.register.cs
代码：
```csharp
using System;
using System.Data.SqlClient;
using System.Drawing;
using System.Threading;
using System.Windows.Forms;

namespace 大学实验材料管理信息系统数据库设计
{
    public partial class register : Form
    {
        public register()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            textBox1.Text = "";
            textBox2.Text = "";
            textBox3.Text = "";
            textBox8.Text = "";
        }

        private void button4_Click(object sender, EventArgs e)
        {
            textBox4.Text = "";
            textBox5.Text = "";
            textBox6.Text = "";
            textBox7.Text = "";
            textBox9.Text = "";
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (textBox3.Text == textBox8.Text)
            {
                SqlConnection conn = new(login.connectket);
                String sql = $"select count(*) from ST where STNO='{this.textBox2.Text}'";
                SqlCommand cmd1 = new SqlCommand(sql, conn);
                SqlDataAdapter adapter = new SqlDataAdapter();
                adapter.SelectCommand = cmd1;
                conn.Open();
                //查询返回结果
                int result = (int)cmd1.ExecuteScalar();
                if (result == 0)
                {
                    if (textBox1.Text.Trim() != "" && textBox2.Text.Trim() != "" && textBox3.Text.Trim() != "" && textBox8.Text.Trim() != "")   //判断文本框是否全部都是空
                    {
                        //插入文本框中输入的数据到数据库中
                        String sqlStr = "insert into ST(STNA,STNO,STKE) values ('" + textBox1.Text.Trim() + "','" + textBox2.Text.Trim() + "','" + login.GetSHA256HashFromString(textBox3.Text.ToString().Trim()) + "')";
                        SqlCommand cmd = new SqlCommand(sqlStr, conn);
                        try//异常处理
                        {
                            cmd.ExecuteNonQuery();
                            conn.Close();
                            if ((int)MessageBox.Show("注册成功，是否直接登录？", "提示", MessageBoxButtons.OKCancel, MessageBoxIcon.Exclamation) == 1)
                            {
                                login.id = textBox2.Text.Trim();
                                this.Hide();
                                student form1 = new student();
                                form1.Show();
                            }
                            else
                            {
                                textBox1.Text = "";
                                textBox2.Text = "";
                                textBox3.Text = "";
                                textBox8.Text = "";
                            }
                        }
                        catch (Exception ex)
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("注册失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                        }
                    }
                    else
                    {
                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                        MessageBox.Show("存在文本框为空！");
                    }
                }
                else
                {
                    if ((int)MessageBox.Show("学号已经存在，是否跳转登录？", "提示", MessageBoxButtons.OKCancel, MessageBoxIcon.Exclamation) == 1)
                    {
                        login.id = textBox2.Text.Trim();
                        this.Hide();
                        login form1 = new login();
                        form1.Show();
                    }
                    else
                    {
                        textBox2.Text = "";
                    }
                }
            }
            else
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("两次输入密码不一致！");
                textBox8.Text = "";
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (textBox6.Text.Trim() == textBox9.Text.Trim())
            {
                SqlConnection conn = new(login.connectket);
                String sql = $"select count(*) from ST where STNO='{this.textBox2.Text}'";
                SqlCommand cmd1 = new SqlCommand(sql, conn);
                SqlDataAdapter adapter = new SqlDataAdapter();
                adapter.SelectCommand = cmd1;
                conn.Open();
                //查询返回结果
                int result = (int)cmd1.ExecuteScalar();
                if (result == 0)
                {
                    if (textBox7.Text.ToString().Trim() == "adminZJ")
                    {
                        if (textBox4.Text.Trim() != "" && textBox5.Text.Trim() != "" && textBox6.Text.Trim() != "" && textBox9.Text.Trim() != "")   //判断文本框是否全部都是空
                        {
                            //插入文本框中输入的数据到数据库中
                            String sqlStr = "insert into AD(ADNA,ADNO,ADKE) values ('" + textBox4.Text.Trim() + "','" + textBox5.Text.Trim() + "','" + login.GetSHA256HashFromString(textBox6.Text.ToString().Trim()) + "')";
                            SqlCommand cmd = new SqlCommand(sqlStr, conn);
                            try//异常处理
                            {
                                cmd.ExecuteNonQuery();
                                conn.Close();
                                if ((int)MessageBox.Show("注册成功，是否直接登录？", "提示", MessageBoxButtons.OKCancel, MessageBoxIcon.Exclamation) == 1)
                                {
                                    login.id = textBox5.Text.Trim();
                                    this.Hide();
                                    Admin form1 = new Admin();
                                    form1.Show();
                                }
                                else
                                {
                                    textBox4.Text = "";
                                    textBox5.Text = "";
                                    textBox6.Text = "";
                                    textBox7.Text = "";
                                    textBox9.Text = "";
                                }
                            }
                            catch (Exception ex)
                            {
                                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                MessageBox.Show("注册失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                            }
                        }
                        else
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("存在文本框为空！");
                        }
                    }
                    else
                    {
                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                        MessageBox.Show("验证码错误！");
                    }
                }
                else
                {
                    if ((int)MessageBox.Show("工号已经存在，是否跳转登录？", "提示", MessageBoxButtons.OKCancel, MessageBoxIcon.Exclamation) == 1)
                    {
                        login.id = textBox5.Text.Trim();
                        this.Hide();
                        login form1 = new login();
                        form1.Show();
                    }
                    else
                    {
                        textBox5.Text = "";
                    }
                }

            }
            else
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("两次输入密码不一致！");
                textBox8.Text = "";
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            this.Hide();
            login form1 = new login();
            form1.Show();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            this.Hide();
            login form1 = new login();
            form1.Show();
        }

        private void label10_Click(object sender, EventArgs e)
        {

        }

        private void register_Load(object sender, EventArgs e)
        {

        }
    }
}



```
>注册界面分为学生注册和管理员注册。学生注册需要姓名学号密码，管理员注册需要姓名工号密码和注册验证码。
学生注册里的学号要独一无二，如果数据库里面有重复学号会提示已经存在学号，会询问是否直接跳转登录。注册里的两次密码要保持一致。
管理员注册需要注册验证码”admin”（可以修改）。以防止没有权限的人来注册管理员账户。

界面截图：
>![注册——学生信息注册](https://img-blog.csdnimg.cn/20210702213317197.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![注册——管理员信息注册](https://img-blog.csdnimg.cn/20210702213425538.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)

### 3.student.cs
代码：
```csharp
using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;
using System.Drawing;
using System.Threading;


namespace 大学实验材料管理信息系统数据库设计
{
    public partial class student : Form
    {
        public student()
        {

            SqlConnection conn = new(login.connectket);
            InitializeComponent();
            textBox1.Text = login.id;
            textBox2.Text = DateTime.Now.ToString("yyyy/MM/dd " + "ddd");
            SqlCommand com = new SqlCommand("select STNA from ST where STNO='" + login.id + "'", conn);
            conn.Open();
            SqlDataReader dr = com.ExecuteReader();
            dr.Read();
            string hello = "欢迎您" + dr[0].ToString().Trim() + "!";
            label7.Text = hello;
            dr.Dispose();
            com.Dispose();
            DataSet ds1 = new DataSet();
            DataSet ds2 = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter("select distinct MSLNO from MS ", conn);
            SqlDataAdapter db = new SqlDataAdapter("select distinct MSLNO from BO where STNO = '" + login.id + "'", conn);
            da.Fill(ds1);
            db.Fill(ds2);
            comboBox1.DataSource = ds1.Tables[0].DefaultView;
            comboBox1.DisplayMember = "MSLNO";
            comboBox3.DataSource = ds2.Tables[0].DefaultView;
            comboBox3.DisplayMember = "MSLNO";
            int count = comboBox1.Items.Count;//获取combobox1中所有行的数量
            comboBox1.SelectedIndex = -1;
            comboBox3.SelectedIndex = -1;
            SqlDataAdapter sda = new SqlDataAdapter("select MSNA AS 材料名,MSNO AS 材料编号,MSLNA AS 实验室名称,MSLNO AS 实验室编号,MSNU AS 材料余量 from MS", conn);
            DataSet ds = new DataSet();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet
            dataGridView1.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView1.RowHeadersVisible = true;//显示行标题
            SqlCommand cmd6 = new SqlCommand("select count(*) from BO where (" + Convert.ToInt32(login.today) + "-RTDA)>='" + 0 + "' AND STNO = '" + login.id + "'", conn);
            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.SelectCommand = cmd6;
            int getw = (int)cmd6.ExecuteScalar();
            if (getw > 0)
            {
                MessageBox.Show("您有" + getw + "条已过期未还材料记录，请及时归还材料！", "提示");
            }
            conn.Close();
        }

        string returnday;

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            login form1 = new login();
            form1.Show();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            //或者conn = new SqlConnection("Data Source= . ; Initial Catalog=jxsk; Integrated Security=True ");
            SqlDataAdapter sda = new SqlDataAdapter("select MSNA AS 材料名,MSNO AS 材料编号,MSLNA AS 实验室名称,MSLNO AS 实验室编号,MSNU AS 材料余量 from MS", conn);
            DataSet ds = new DataSet();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet
            dataGridView1.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView1.RowHeadersVisible = true;//显示行标题
            conn.Close();
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private void button4_Click(object sender, EventArgs e)
        {
            dataGridView2.DataSource = null;
            SqlConnection conn = new(login.connectket);
            SqlDataAdapter sda = new SqlDataAdapter("select MSNO AS 材料编号,MSLNO AS 材料所属实验室,BONU AS 材料数量,BODA AS 借用日期,RTDA AS 预计归还日期 from BO WHERE STNO ='" + login.id + "'", conn);
            DataSet ds = new DataSet();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet
            dataGridView2.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView2.RowHeadersVisible = true;//显示行标题
            int n = dataGridView2.Rows.Count;
            for (int i = 0; i < n - 1; i++)
            {
                if (Convert.ToInt32(dataGridView2.Rows[i].Cells[4].Value) > Convert.ToInt32(login.today))
                {
                    dataGridView2.Rows[i].Cells[0].Style.BackColor = System.Drawing.Color.LightGreen;
                    dataGridView2.Rows[i].Cells[1].Style.BackColor = System.Drawing.Color.LightGreen;
                    dataGridView2.Rows[i].Cells[2].Style.BackColor = System.Drawing.Color.LightGreen;
                    dataGridView2.Rows[i].Cells[3].Style.BackColor = System.Drawing.Color.LightGreen;
                    dataGridView2.Rows[i].Cells[4].Style.BackColor = System.Drawing.Color.LightGreen;
                }
                else if (Convert.ToInt32(dataGridView2.Rows[i].Cells[4].Value) == Convert.ToInt32(login.today))
                {
                    dataGridView2.Rows[i].Cells[0].Style.BackColor = System.Drawing.Color.Yellow;
                    dataGridView2.Rows[i].Cells[1].Style.BackColor = System.Drawing.Color.Yellow;
                    dataGridView2.Rows[i].Cells[2].Style.BackColor = System.Drawing.Color.Yellow;
                    dataGridView2.Rows[i].Cells[3].Style.BackColor = System.Drawing.Color.Yellow;
                    dataGridView2.Rows[i].Cells[4].Style.BackColor = System.Drawing.Color.Yellow;
                }
                else
                {
                    dataGridView2.Rows[i].Cells[0].Style.BackColor = System.Drawing.Color.Red;
                    dataGridView2.Rows[i].Cells[1].Style.BackColor = System.Drawing.Color.Red;
                    dataGridView2.Rows[i].Cells[2].Style.BackColor = System.Drawing.Color.Red;
                    dataGridView2.Rows[i].Cells[3].Style.BackColor = System.Drawing.Color.Red;
                    dataGridView2.Rows[i].Cells[4].Style.BackColor = System.Drawing.Color.Red;
                }
            }
            conn.Close();
        }

        private void tabPage3_Click(object sender, EventArgs e)
        {

        }

        private void student_Load(object sender, EventArgs e)
        {

        }

        private void button5_Click(object sender, EventArgs e)
        {
            dataGridView2.DataSource = null;
            SqlConnection conn = new(login.connectket);
            SqlDataAdapter sday = new SqlDataAdapter("select MSNO AS 材料编号,MSLNO AS 材料所属实验室,BONU AS 材料数量,BODA AS 借用日期,RTDA AS 归还日期 from RC WHERE STNO ='" + login.id + "'", conn);
            DataSet dsy = new DataSet();//实例化DataSet对象
            sday.Fill(dsy);//使用SqlDataAdapter对象的Fill方法填充DataSet            
            dataGridView2.DataSource = dsy.Tables[0];//设置dataGridView1控件的数据源
            dataGridView2.RowHeadersVisible = true;//显示行标题
            conn.Close();
        }

        private void button7_Click(object sender, EventArgs e)
        {
            textBox3.Text = "";
            textBox4.Text = "";
            textBox5.Text = "";
        }

        private void button6_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            if (textBox3.Text.Trim() != "" && textBox4.Text.Trim() != "" && textBox5.Text.Trim() != "")
            {
                SqlCommand cmd3 = new SqlCommand("select count(*) from ST where STNO = '" + login.id + "'", conn);
                conn.Open();
                int b = (int)cmd3.ExecuteScalar();
                if (b == 1)
                {
                    SqlCommand cmd4 = new SqlCommand("select STKE from ST where STNO = '" + login.id + "'", conn);
                    string c = cmd4.ExecuteScalar().ToString().Trim();
                    string oldpwd = login.GetSHA256HashFromString(textBox3.Text.ToString().Trim());
                    string newpwd = login.GetSHA256HashFromString(textBox4.Text.ToString().Trim());
                    string dnewpwd = login.GetSHA256HashFromString(textBox5.Text.ToString().Trim());

                    if (newpwd == dnewpwd)
                    {
                        if (c == oldpwd)
                        {
                            if (oldpwd != newpwd)
                            {
                                SqlCommand cmd5 = new SqlCommand("update ST set STKE = '" + newpwd + "'where STNO = '" + login.id + "'", conn);
                                int k = (int)cmd5.ExecuteNonQuery();
                                if (k > 0)
                                {
                                    MessageBox.Show("密码修改成功，请重新登录！", "提示");
                                    this.Hide();
                                    login form1 = new login();
                                    form1.Show();
                                }
                                else
                                {
                                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                    MessageBox.Show("密码修改失败！", "提示");
                                    textBox3.Text = "";
                                    textBox4.Text = "";
                                    textBox5.Text = "";
                                }
                            }
                            else
                            {
                                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                MessageBox.Show("新旧密码不能一样！", "提示");
                                textBox4.Text = "";
                                textBox5.Text = "";
                            }
                        }
                        else
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("原密码填写错误！", "提示");
                            textBox3.Text = "";
                            textBox4.Text = "";
                            textBox5.Text = "";
                        }
                    }
                    else
                    {
                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                        MessageBox.Show("两次新密码不一致！", "提示");
                        textBox4.Text = "";
                        textBox5.Text = "";
                    }
                }
                else
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("用户名不存在请重新登录！", "提示");
                    this.Hide();
                    login form1 = new login();
                    form1.Show();
                }
                conn.Close();
            }
            else
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("密码不能为空！", "提示");
            }
        }

        private void textBox4_TextChanged(object sender, EventArgs e)
        {

        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void label10_Click(object sender, EventArgs e)
        {

        }

        private void dateTimePicker1_ValueChanged(object sender, EventArgs e)
        {
            returnday = dateTimePicker1.Value.ToString("yyyyMMdd");
            textBox7.Text = dateTimePicker1.Value.ToString("D");
        }

        private void button9_Click(object sender, EventArgs e)
        {
            comboBox2.DataSource = null;
            comboBox1.SelectedIndex = -1;
            comboBox2.SelectedIndex = -1;
            this.numericUpDown1.DecimalPlaces = 0;
            this.numericUpDown1.Value = Decimal.Round(1, 0);
            textBox7.Text = "";
            returnday = "";
            this.dateTimePicker1.Format = DateTimePickerFormat.Custom;
            this.dateTimePicker1.CustomFormat = "";
            this.dateTimePicker1.Checked = false;

        }

        private void button8_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            if (comboBox1.Text.Trim() == "")
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("实验室编号，材料编号为空！", "提示");
            }
            else
            {
                if (comboBox2.Text.Trim() == "")
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("材料编号为空！", "提示");
                }
                else
                {
                    string labid = comboBox1.Text.Trim();//实验室编号
                    string material = comboBox2.Text.Trim();//材料编号
                    int num = Convert.ToInt32(numericUpDown1.Value.ToString().Trim());//材料数量
                    returnday = dateTimePicker1.Value.ToString("yyyyMMdd");//returnday返还日期
                    //获取材料数量
                    SqlCommand cmd4 = new SqlCommand("select MSNU from MS where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                    SqlCommand cmd5 = new SqlCommand("select MSDP from MS where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                    conn.Open();
                    int c = Convert.ToInt32(cmd4.ExecuteScalar().ToString());
                    int d = Convert.ToInt32(cmd5.ExecuteScalar().ToString());
                    conn.Close();
                    if (d == 1)
                    {
                        if (textBox7.Text.Trim() == "")
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("该材料需要归还，请填写归还日期！", "提示");
                        }
                        else if (Convert.ToInt32(login.today.Trim()) > Convert.ToInt32(returnday))
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("归还日期不能早于今天！", "提示");
                            textBox7.Text = "";
                            returnday = "";
                        }
                        else
                        {
                            if (c >= num)
                            {
                                SqlCommand cmd = new SqlCommand("insert into BO(STNO,MSLNO,MSNO,BONU,BODA,RTDA,CODE) values ('" + login.id + "','" + labid + "','" + material + "','" + num + "','" + login.today + "','" + returnday + "','" + login.GenerateRandom(10) + "')", conn);
                                SqlCommand cmd1 = new SqlCommand("insert into RC(STNO,MSLNO,MSNO,BONU,BODA) values ('" + login.id + "','" + labid + "','" + material + "','" + num + "','" + login.today + "')", conn);
                                try//异常处理
                                {
                                    conn.Open();
                                    cmd.ExecuteNonQuery();
                                    cmd1.ExecuteNonQuery();
                                    int res = c - num;
                                    if (res == 0)
                                    {
                                        SqlCommand cmd2 = new SqlCommand("delete from MS where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                                        try
                                        {
                                            cmd2.ExecuteNonQuery();
                                            MessageBox.Show("该材料需要归还，借用成功！");
                                        }
                                        catch (Exception ex)
                                        {
                                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                            MessageBox.Show("删除原数据失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                        }
                                    }
                                    else
                                    {
                                        SqlCommand cmd2 = new SqlCommand("update MS set MSNU = '" + res + "'where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                                        try
                                        {
                                            cmd2.ExecuteNonQuery();
                                            MessageBox.Show("该材料需要归还，借用成功！");
                                            this.Hide();
                                            student form1 = new student();
                                            form1.Show();
                                        }
                                        catch (Exception ex)
                                        {
                                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                            MessageBox.Show("删除原数据失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                        }
                                    }
                                    conn.Close();
                                }
                                catch (Exception ex)
                                {
                                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                    MessageBox.Show("借用失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                }
                            }
                            else
                            {
                                MessageBox.Show("材料数量最多为" + c + "，请重新填写！", "提示");
                                numericUpDown1.Text = c.ToString();
                            }
                        }

                    }
                    else if (d == 0)
                    {
                        if (c >= num)
                        {
                            SqlCommand cmd1 = new SqlCommand("insert into RC(STNO,MSLNO,MSNO,BONU,BODA,RTDA) values ('" + login.id + "','" + labid + "','" + material + "','" + num + "','" + login.today + "','无需归还')", conn);
                            try//异常处理
                            {
                                conn.Open();
                                cmd1.ExecuteNonQuery();
                                int res = c - num;
                                if (res == 0)
                                {
                                    SqlCommand cmd2 = new SqlCommand("delete from MS where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                                    try
                                    {
                                        cmd2.ExecuteNonQuery();
                                        MessageBox.Show("该材料不需要归还，借用成功！");
                                    }
                                    catch (Exception ex)
                                    {
                                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                        MessageBox.Show("删除原数据失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                    }
                                }
                                else
                                {
                                    SqlCommand cmd2 = new SqlCommand("update MS set MSNU = '" + res + "'where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                                    try
                                    {
                                        cmd2.ExecuteNonQuery();
                                        MessageBox.Show("该材料不需要归还，借用成功！");
                                        this.Hide();
                                        student form1 = new student();
                                        form1.Show();
                                    }
                                    catch (Exception ex)
                                    {
                                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                        MessageBox.Show("删除原数据失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                    }
                                }
                                conn.Close();
                                conn.Close();
                            }
                            catch (Exception ex)
                            {
                                MessageBox.Show("借用失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                            }
                        }
                        else
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("材料数量最多为" + c + "，请重新填写！", "提示");
                            numericUpDown1.Text = c.ToString();
                        }
                    }
                    else
                    {
                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                        MessageBox.Show("数据库信息错误，请联系管理员！");
                    }
                }

            }
        }

        private void tabPage5_Click(object sender, EventArgs e)
        {

        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            comboBox2.DataSource = null;
            comboBox2.SelectedIndex = -1;
            comboBox2.Items.Clear();
            SqlConnection conn = new(login.connectket);
            conn.Open();
            DataSet ds1 = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter("select distinct MSNO from MS WHERE MSLNO = '" + comboBox1.Text + "'", conn);
            da.Fill(ds1);
            comboBox2.DataSource = ds1.Tables[0].DefaultView;
            comboBox2.DisplayMember = "MSNO";
            conn.Close();
            comboBox2.SelectedIndex = -1;
        }

        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {

        }

        private void button10_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            if (comboBox2.Text.Trim() == "")
            {
                MessageBox.Show("请选择材料！", "提示");
            }
            else
            {
                string labid = comboBox1.Text.Trim();//实验室编号
                string material = comboBox2.Text.Trim();//材料编号
                SqlCommand cmd5 = new SqlCommand("select MSDP from MS where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn); conn.Open();
                int d = Convert.ToInt32(cmd5.ExecuteScalar().ToString());
                conn.Close();
                if (d == 1)
                {
                    MessageBox.Show("材料" + comboBox2.Text.Trim() + "需要归还！", "提示");
                }
                else
                {
                    MessageBox.Show("材料" + comboBox2.Text.Trim() + "不需要归还！", "提示");
                }
            }
        }

        private void comboBox2_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void comboBox3_SelectedIndexChanged(object sender, EventArgs e)
        {
            comboBox4.DataSource = null;
            comboBox4.SelectedIndex = -1;
            comboBox4.Items.Clear();
            SqlConnection conn = new(login.connectket);
            conn.Open();
            DataSet ds1 = new DataSet();
            SqlDataAdapter da = new SqlDataAdapter("select distinct MSNO from BO WHERE MSLNO = '" + comboBox3.Text + "'", conn);
            da.Fill(ds1);
            comboBox4.DataSource = ds1.Tables[0].DefaultView;
            comboBox4.DisplayMember = "MSNO";
            conn.Close();
            comboBox4.SelectedIndex = -1;
        }

        private void button11_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            if (comboBox3.Text.Trim() == "")
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("实验室编号为空！", "提示");
            }
            else
            {
                if (comboBox4.Text.Trim() == "")
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("材料编号为空！", "提示");
                }
                else
                {
                    string labid = comboBox3.Text.Trim();//实验室编号
                    string material = comboBox4.Text.Trim();//材料编号
                    int num = Convert.ToInt32(numericUpDown2.Value.ToString().Trim());//材料数量

                    //获取材料数量
                    SqlCommand cmd4 = new SqlCommand("select BONU from BO where MSNO = '" + material + "' AND MSLNO = '" + labid + "' AND STNO = '" + login.id + "'", conn);
                    SqlCommand cmd5 = new SqlCommand("select BODA from BO where MSNO = '" + material + "' AND MSLNO = '" + labid + "' AND STNO = '" + login.id + "'", conn);
                    SqlCommand cmd6 = new SqlCommand("select MSNU from MS where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                    SqlCommand cmd9 = new SqlCommand("select count(*) from MS where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                    SqlCommand cmd11 = new SqlCommand("select CODE from BO where MSNO = '" + material + "' AND MSLNO = '" + labid + "' AND STNO = '" + login.id + "'", conn);
                    conn.Open();
                    int orinum;
                    int b = (int)cmd9.ExecuteScalar();
                    string code = cmd11.ExecuteScalar().ToString();
                    SqlDataReader dr = cmd5.ExecuteReader();
                    dr.Read();
                    string borrday = dr[0].ToString().Trim();
                    dr.Dispose();
                    cmd5.Dispose();
                    int c = (int)cmd4.ExecuteScalar();
                    if (b == 0)
                    {
                        orinum = 0;
                    }
                    else
                    {
                        SqlDataReader dr1 = cmd6.ExecuteReader();
                        dr1.Read();
                        orinum = Convert.ToInt32(dr1[0].ToString());
                        dr1.Dispose();
                    }
                    conn.Close();
                    if (orinum > 0)
                    {
                        if (c >= num)
                        {
                            conn.Open();
                            int res = c - num;
                            if (res == 0)
                            {
                                int x = orinum + num;
                                SqlCommand cmd2 = new SqlCommand("delete from BO where MSNO = '" + material + "' AND MSLNO = '" + labid + "' AND BONU = '" + num + "' AND STNO = '" + login.id + "'AND CODE = '" + code + "'", conn);
                                SqlCommand cmd3 = new SqlCommand("update RC set RTDA ='" + login.today + "'where MSNO = '" + material + "' AND MSLNO = '" + labid + "' AND BONU = '" + num + "' AND STNO = '" + login.id + "'", conn);
                                SqlCommand cmd7 = new SqlCommand("update MS set MSNU = '" + x + "'where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                                try
                                {
                                    cmd2.ExecuteNonQuery();
                                    cmd3.ExecuteNonQuery();
                                    cmd7.ExecuteNonQuery();
                                    MessageBox.Show("材料归还成功！");
                                }
                                catch (Exception ex)
                                {
                                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                    MessageBox.Show("操作失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                }
                            }
                            else
                            {
                                int x = orinum + num;
                                SqlCommand cmd2 = new SqlCommand("update BO set BONU = '" + res + "'where STNO = '" + login.id + "' AND MSLNO = '" + labid + "' AND BODA = '" + borrday + "' AND STNO = '" + login.id + "'AND CODE = '" + code + "'", conn);
                                SqlCommand cmd7 = new SqlCommand("update MS set MSNU = '" + x + "'where MSNO = '" + material + "' AND MSLNO = '" + labid + "'", conn);
                                try
                                {
                                    cmd2.ExecuteNonQuery();
                                    cmd7.ExecuteNonQuery();
                                    MessageBox.Show("部分材料归还成功！");
                                    this.Hide();
                                    student form1 = new student();
                                    form1.Show();
                                }
                                catch (Exception ex)
                                {
                                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                    MessageBox.Show("操作失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                }
                            }
                            conn.Close();
                        }
                        else
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("材料数量最多为" + c + "，请重新填写！", "提示");
                            numericUpDown2.Text = c.ToString();
                        }
                    }
                    else
                    {
                        if (c >= num)
                        {
                            conn.Open();
                            int res = c - num;
                            if (res == 0)
                            {
                                int x = orinum + num;
                                SqlCommand cmd2 = new SqlCommand("delete from BO where MSNO = '" + material + "' AND MSLNO = '" + labid + "' AND BONU = '" + num + "' AND STNO = '" + login.id + "'", conn);
                                SqlCommand cmd3 = new SqlCommand("update RC set RTDA ='" + login.today + "'where MSNO = '" + material + "' AND MSLNO = '" + labid + "' AND BONU = '" + num + "' AND STNO = '" + login.id + "'", conn);
                                SqlCommand cmd7 = new SqlCommand("insert into MS(MSNO,MSNU,MSLNO,MSDP) values ('" + material + "','" + x + "','" + labid + "','" + 1 + "')", conn);
                                try
                                {
                                    cmd2.ExecuteNonQuery();
                                    cmd3.ExecuteNonQuery();
                                    cmd7.ExecuteNonQuery();
                                    MessageBox.Show("材料归还成功！");
                                }
                                catch (Exception ex)
                                {
                                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                    MessageBox.Show("操作失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                }
                            }
                            else
                            {
                                int x = orinum + num;
                                SqlCommand cmd2 = new SqlCommand("update BO set BONU = '" + res + "'where STNO = '" + login.id + "' AND MSLNO = '" + labid + "' AND BONU = '" + c + "' AND STNO = '" + login.id + "'", conn);
                                SqlCommand cmd3 = new SqlCommand("insert into RC(STNO,MSLNO,MSNO,BONU,BODA,RTDA) values ('" + login.id + "','" + labid + "','" + material + "','" + num + "','" + borrday + "','" + login.today + "')", conn);
                                SqlCommand cmd7 = new SqlCommand("insert into MS(MSNO,MSNU,MSLNO,MSDP) values ('" + material + "','" + x + "','" + labid + "','" + 1 + "')", conn);
                                try
                                {
                                    cmd2.ExecuteNonQuery();
                                    cmd3.ExecuteNonQuery();
                                    cmd7.ExecuteNonQuery();
                                    MessageBox.Show("部分材料归还成功！");
                                    this.Hide();
                                    student form1 = new student();
                                    form1.Show();
                                }
                                catch (Exception ex)
                                {
                                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                    MessageBox.Show("操作失败！失败原因：" + ex.Message.ToString(), "提示信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
                                }
                            }
                            conn.Close();
                        }
                        else
                        {
                            MessageBox.Show("材料数量最多为" + c + "，请重新填写！", "提示");
                            numericUpDown2.Text = c.ToString();
                        }
                    }
                }
            }
        }

        private void button12_Click(object sender, EventArgs e)
        {
            comboBox4.DataSource = null;
            comboBox3.SelectedIndex = -1;
            comboBox4.SelectedIndex = -1;
            this.numericUpDown2.DecimalPlaces = 0;
            this.numericUpDown2.Value = Decimal.Round(1, 0);
            returnday = "";
        }

        private void button13_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            SqlCommand cmd6 = new SqlCommand("select count(*) from BO where (" + Convert.ToInt32(login.today) + "-RTDA)>='" + 0 + "' AND STNO = '" + login.id + "'", conn);
            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.SelectCommand = cmd6;
            int getw = (int)cmd6.ExecuteScalar();
            if (MessageBox.Show("确认删除？", "提示信息", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                if (MessageBox.Show("最后一次确认删除？", "提示信息", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    if (getw > 0)
                    {
                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                        MessageBox.Show("您有" + getw + "条已过期未还材料记录，请及时归还材料后进行注销操作！", "提示");
                    }
                    else
                    {
                        SqlCommand cmd1 = new SqlCommand("delete from ST where STNO = '" + login.id + "'", conn);
                        SqlCommand cmd2 = new SqlCommand("delete from BO where STNO = '" + login.id + "'", conn);
                        cmd1.ExecuteNonQuery();
                        cmd2.ExecuteNonQuery();
                        MessageBox.Show("注销账户成功", "提示");
                        this.Hide();
                        login form1 = new login();
                        form1.Show();
                    }
                }
            }
            conn.Close();
        }

        private void label15_Click(object sender, EventArgs e)
        {

        }

    }
}

```
>学生界面分为材料信息查询、借用信息查询、借用历史查询、借用、归还、修改个人密码。学生界面在加载的时候获取当前用户ID，用户姓名，系统时间，同时查询借用历史表中有多少未归还已过期材料记录。如果查询数量大于0，显示提示框提示需要归还。
材料信息查询只能让用户刷新读取数据，不允许用户修改删除数据。借用历史，借用中数据只允许查看，刷新；借用中数据被查询出来后，会标记背景颜色。如果材料当天到期，标黄，如果已经过期，表红，借用中且未到归还日期就标绿。
借用和归还操作分别需要两个combobox，第一个combobox的数据源在加载窗口的时候就已经设置好了，第二个combobox的数据源由第一个combobox里面的选项为关键字筛选出。借用、归还的数量都需要选择数量，数量不能超过源里的最大数量。如果超过就弹出提示框，并且自动将数据调到最大。
修改个人信息只允许修改密码，修改密码前要校对老密码是否正确和两次输入的新密码是否一致。

界面截图：
>![学生——材料余量](https://img-blog.csdnimg.cn/2021070221360132.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![学生——借用查询](https://img-blog.csdnimg.cn/20210702213639697.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![学生——操作——借用](https://img-blog.csdnimg.cn/20210702213714397.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![学生——操作——归还](https://img-blog.csdnimg.cn/20210702213742980.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![学生——用户信息设置](https://img-blog.csdnimg.cn/2021070221380825.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)

### 4.Admin.cs
代码：
```csharp
using System;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Threading;
using System.Windows.Forms;

namespace 大学实验材料管理信息系统数据库设计
{
    public partial class Admin : Form
    {
        public Admin()
        {
            InitializeComponent();
            SqlConnection conn = new(login.connectket);
            textBox1.Text = login.id;
            textBox2.Text = DateTime.Now.ToString("yyyy/MM/dd " + "ddd");
            SqlCommand com = new("select ADNA from AD where ADNO='" + login.id + "'", conn);
            conn.Open();
            SqlDataReader dr = com.ExecuteReader();
            dr.Read();
            string hello = "欢迎您" + dr[0].ToString().Trim() + "!";
            label3.Text = hello;
            dr.Dispose();
            com.Dispose();
        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            login form1 = new();
            form1.Show();
        }

        private void admin_Load(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            conn.Open();
            SqlDataAdapter sda = new("select MSNA AS 材料名称,MSNO AS 材料编号,MSLNA AS 实验室名称,MSLNO AS 实验室编号,MSNU AS 材料余量,MSDP AS 是否需要归还 from MS", conn);
            DataSet ds = new();
            sda.Fill(ds);
            dataGridView1.DataSource = ds.Tables[0];
            dataGridView1.RowHeadersVisible = true;
            SqlDataAdapter sda1 = new("select STNA AS 学生姓名,STNO AS 学号 from ST", conn);
            DataSet ds1 = new();
            sda1.Fill(ds1);
            dataGridView2.DataSource = ds1.Tables[0];
            dataGridView2.RowHeadersVisible = true;
            SqlDataAdapter sda2 = new("select STNO AS 学生学号,MSNO AS 材料编号,MSLNO AS 实验室编号,BONU AS 借用数量,BODA AS 借用日期,RTDA AS 预计归还日期,CODE AS 核验码 from BO", conn);
            DataSet ds2 = new();
            sda2.Fill(ds2);
            dataGridView3.DataSource = ds2.Tables[0];
            dataGridView3.RowHeadersVisible = true;
            SqlDataAdapter sda3 = new("select MSLNA AS 实验室名称,MSLNO AS 实验室编号,ADNA AS 管理员姓名,ADNO AS 管理员编号 from MSL", conn);
            DataSet ds3 = new();
            sda3.Fill(ds3);
            dataGridView4.DataSource = ds3.Tables[0];
            dataGridView4.RowHeadersVisible = true;
            conn.Close();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            //实例化SqlConnection变量conn，连接数据库
            SqlConnection conn = new(login.connectket);
            conn.Open();
            //实例化SqlDataAdapter对象
            SqlDataAdapter sda = new("select MSNA AS 材料名称,MSNO AS 材料编号,MSLNA AS 实验室名称,MSLNO AS 实验室编号,MSNU AS 材料余量,MSDP AS 是否需要归还 from MS", conn);
            DataSet ds = new();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet            
            dataGridView1.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView1.RowHeadersVisible = true;//禁止显示行标题
            conn.Close();
        }

        private void button8_Click(object sender, EventArgs e)
        {
            //实例化SqlConnection变量conn，连接数据库
            SqlConnection conn = new(login.connectket);
            conn.Open();
            //实例化SqlDataAdapter对象
            SqlDataAdapter sda = new("select STNA AS 学生姓名,STNO AS 学号 from ST", conn);
            DataSet ds = new();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet            
            dataGridView2.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView2.RowHeadersVisible = true;//禁止显示行标题
            conn.Close();
        }

        private void button11_Click(object sender, EventArgs e)
        {
            //实例化SqlConnection变量conn，连接数据库
            SqlConnection conn = new(login.connectket);
            conn.Open();
            //实例化SqlDataAdapter对象
            SqlDataAdapter sda = new("select STNO AS 学生学号,MSNO AS 材料编号,MSLNO AS 实验室编号,BONU AS 借用数量,BODA AS 借用日期,RTDA AS 预计归还日期,CODE AS 核验码 from BO", conn);
            DataSet ds = new();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet            
            dataGridView3.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView3.RowHeadersVisible = true;//禁止显示行标题
            conn.Close();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            conn.Open();
            SqlCommand cmd = new("select MSNA AS 材料名称,MSNO AS 材料编号,MSLNA AS 实验室名称,MSLNO AS 实验室编号,MSNU AS 材料余量,MSDP AS 是否需要归还 from MS", conn);
            SqlDataAdapter sda = new();
            sda.SelectCommand = cmd;
            DataSet ds = new();//实例化DataSet对象            
            sda.Fill(ds, "cs");
            DataTable dt = ds.Tables["cs"];
            DataRow dr = ds.Tables["cs"].NewRow();//新建一个数据行
            int r = dataGridView1.CurrentRow.Index;//获得当前行的索引
            //数据行赋值
            dr[0] = dataGridView1.Rows[r].Cells[0].Value;
            dr[1] = dataGridView1.Rows[r].Cells[1].Value;
            dr[2] = dataGridView1.Rows[r].Cells[2].Value;
            dr[3] = dataGridView1.Rows[r].Cells[3].Value;
            dr[4] = dataGridView1.Rows[r].Cells[4].Value;
            dr[5] = dataGridView1.Rows[r].Cells[5].Value;
            String str = this.dataGridView1.CurrentRow.Cells["材料编号"].Value.ToString();
            String sql1 = "delete from MS where MSNO ='" + str + "'";
            cmd = new SqlCommand(sql1, conn);
            cmd.ExecuteNonQuery();
            ds.Tables["cs"].Rows.Add(dr);
            //批量更新数据库
            SqlCommandBuilder cmdbuilder = new(sda);
            if (ds.Tables["cs"].GetChanges() != null)
            {
                sda.Update(ds, "cs");
                ds.AcceptChanges();
            }
            MessageBox.Show("修改成功！");
            conn.Close();
        }

        private void button9_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            //判断用户是否选择一行数据，true为没选择，false为选择
            if (this.dataGridView3.Rows[this.dataGridView3.CurrentRow.Index].Cells["核验码"].Value.ToString() == "")
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("请选择一项进行删除！");
            }
            else
            {  //判断用户是否点击确定按钮，true为点击，false为没有点击
                if (MessageBox.Show("确认删除？", "提示信息", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    String str = this.dataGridView3.CurrentRow.Cells[6].Value.ToString();
                    String sql = "delete from BO where CODE ='" + str + "'";
                    SqlCommand cmd = new(sql, conn);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    this.dataGridView3.Rows.Remove(this.dataGridView3.CurrentRow);
                    MessageBox.Show("此行删除成功！");
                }
            }
            conn.Close();
        }

        private void button10_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            conn.Open();
            SqlCommand cmd = new("select STNO AS 学生学号,MSNO AS 材料编号,MSLNO AS 实验室编号,BONU AS 借用数量,BODA AS 借用日期,RTDA AS 预计归还日期,CODE AS 核验码 from BO", conn);
            SqlDataAdapter sda = new();
            sda.SelectCommand = cmd;
            DataSet ds = new();//实例化DataSet对象            
            sda.Fill(ds, "cs");
            DataTable dt = ds.Tables["cs"];
            DataRow dr = ds.Tables["cs"].NewRow();//新建一个数据行
            int r = dataGridView3.CurrentRow.Index;//获得当前行的索引
            //数据行赋值
            dr[0] = dataGridView3.Rows[r].Cells[0].Value;
            dr[1] = dataGridView3.Rows[r].Cells[1].Value;
            dr[2] = dataGridView3.Rows[r].Cells[2].Value;
            dr[3] = dataGridView3.Rows[r].Cells[3].Value;
            dr[4] = dataGridView3.Rows[r].Cells[4].Value;
            dr[5] = dataGridView3.Rows[r].Cells[5].Value;
            dr[6] = dataGridView3.Rows[r].Cells[6].Value;
            String str = this.dataGridView3.CurrentRow.Cells["核验码"].Value.ToString();
            String sql1 = "delete from BO where CODE ='" + str + "'";
            cmd = new SqlCommand(sql1, conn);
            cmd.ExecuteNonQuery();
            ds.Tables["cs"].Rows.Add(dr);
            //批量更新数据库
            SqlCommandBuilder cmdbuilder = new(sda);
            if (ds.Tables["cs"].GetChanges() != null)
            {
                sda.Update(ds, "cs");
                ds.AcceptChanges();
            }
            MessageBox.Show("修改成功！");
            conn.Close();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            //判断用户是否选择一行数据，true为没选择，false为选择
            if (this.dataGridView1.Rows[this.dataGridView1.CurrentRow.Index].Cells["材料编号"].Value.ToString() == "")
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("请选择一项进行删除！");
            }
            else
            {  //判断用户是否点击确定按钮，true为点击，false为没有点击
                if (MessageBox.Show("确认删除？", "提示信息", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    String str = this.dataGridView1.CurrentRow.Cells[1].Value.ToString();
                    String sql = "delete from MS where MSNO ='" + str + "'";
                    SqlCommand cmd = new(sql, conn);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    this.dataGridView1.Rows.Remove(this.dataGridView1.CurrentRow);
                    MessageBox.Show("此行删除成功！");
                }
            }
            conn.Close();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            //判断用户是否选择一行数据，true为没选择，false为选择
            if (this.dataGridView2.Rows[this.dataGridView2.CurrentRow.Index].Cells["学号"].Value.ToString() == "")
            {
                MessageBox.Show("请选择一项进行删除！");
            }
            else
            {  //判断用户是否点击确定按钮，true为点击，false为没有点击
                if (MessageBox.Show("确认删除？", "提示信息", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    String str = this.dataGridView2.CurrentRow.Cells[1].Value.ToString();
                    String sql = "delete from ST where STNO ='" + str + "'";
                    SqlCommand cmd = new(sql, conn);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    this.dataGridView2.Rows.Remove(this.dataGridView2.CurrentRow);
                    MessageBox.Show("此行删除成功！");
                }
            }
            conn.Close();
        }

        private void button12_Click(object sender, EventArgs e)
        {
            textBox3.Text = "";
            textBox4.Text = "";
            textBox5.Text = "";
        }

        private void button13_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            if (textBox3.Text.Trim() != "" && textBox4.Text.Trim() != "" && textBox5.Text.Trim() != "")
            {
                SqlCommand cmd3 = new("select count(*) from AD where ADNO = '" + login.id + "'", conn);
                conn.Open();
                int b = (int)cmd3.ExecuteScalar();
                if (b == 1)
                {
                    SqlCommand cmd4 = new("select ADKE from AD where ADNO = '" + login.id + "'", conn);
                    string c = cmd4.ExecuteScalar().ToString().Trim();
                    string oldpwd = login.GetSHA256HashFromString(textBox3.Text.ToString().Trim());
                    string newpwd = login.GetSHA256HashFromString(textBox4.Text.ToString().Trim());
                    string dnewpwd = login.GetSHA256HashFromString(textBox5.Text.ToString().Trim());

                    if (newpwd == dnewpwd)
                    {
                        if (c == oldpwd)
                        {
                            if (oldpwd != newpwd)
                            {
                                SqlCommand cmd5 = new("update AD set ADKE = '" + newpwd + "'where ADNO = '" + login.id + "'", conn);
                                int k = (int)cmd5.ExecuteNonQuery();
                                if (k > 0)
                                {
                                    MessageBox.Show("密码修改成功，请重新登录！", "提示");
                                    this.Hide();
                                    login form1 = new();
                                    form1.Show();
                                }
                                else
                                {
                                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                    MessageBox.Show("密码修改失败！", "提示");
                                    textBox3.Text = "";
                                    textBox4.Text = "";
                                    textBox5.Text = "";
                                }
                            }
                            else
                            {
                                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                                MessageBox.Show("新旧密码不能一样！", "提示");
                                textBox4.Text = "";
                                textBox5.Text = "";
                            }

                        }
                        else
                        {
                            this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                            MessageBox.Show("原密码填写错误！", "提示");
                            textBox3.Text = "";
                            textBox4.Text = "";
                            textBox5.Text = "";
                        }
                    }
                    else
                    {
                        this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                        MessageBox.Show("两次新密码不一致！", "提示");
                        textBox4.Text = "";
                        textBox5.Text = "";
                    }
                }
                else
                {
                    this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                    MessageBox.Show("用户名不存在请重新登录！", "提示");
                    this.Hide();
                    login form1 = new();
                    form1.Show();
                }
                conn.Close();
            }
            else
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("密码不能为空！", "提示");
            }
        }

        private void button16_Click(object sender, EventArgs e)
        {
            //实例化SqlConnection变量conn，连接数据库
            SqlConnection conn = new(login.connectket);
            conn.Open();
            //实例化SqlDataAdapter对象
            SqlDataAdapter sda = new("select MSLNA AS 实验室名称,MSLNO AS 实验室编号,ADNA AS 管理员姓名,ADNO AS 管理员编号 from MSL", conn);
            DataSet ds = new();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet            
            dataGridView4.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView4.RowHeadersVisible = true;//禁止显示行标题
            conn.Close();
        }

        private void button15_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            conn.Open();
            SqlCommand cmd = new("select MSLNA AS 实验室名称,MSLNO AS 实验室编号,ADNA AS 管理员姓名,ADNO AS 管理员编号 from MSL", conn);
            SqlDataAdapter sda = new();
            sda.SelectCommand = cmd;
            DataSet ds = new();//实例化DataSet对象            
            sda.Fill(ds, "cs");
            DataTable dt = ds.Tables["cs"];
            DataRow dr = ds.Tables["cs"].NewRow();//新建一个数据行
            int r = dataGridView4.CurrentRow.Index;//获得当前行的索引
            //数据行赋值
            dr[0] = dataGridView4.Rows[r].Cells[0].Value;
            dr[1] = dataGridView4.Rows[r].Cells[1].Value;
            dr[2] = dataGridView4.Rows[r].Cells[2].Value;
            dr[3] = dataGridView4.Rows[r].Cells[3].Value;
            String str = this.dataGridView4.CurrentRow.Cells["实验室编号"].Value.ToString();
            String sql1 = "delete from MSL where MSLNO ='" + str + "'";
            cmd = new SqlCommand(sql1, conn);
            cmd.ExecuteNonQuery();
            ds.Tables["cs"].Rows.Add(dr);
            //批量更新数据库
            SqlCommandBuilder cmdbuilder = new(sda);
            if (ds.Tables["cs"].GetChanges() != null)
            {
                sda.Update(ds, "cs");
                ds.AcceptChanges();
            }
            MessageBox.Show("修改成功！");
            conn.Close();
        }

        private void button14_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            //判断用户是否选择一行数据，true为没选择，false为选择
            if (this.dataGridView4.Rows[this.dataGridView4.CurrentRow.Index].Cells["实验室编号"].Value.ToString() == "")
            {
                this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top - 10); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left + 10, this.Top); Thread.Sleep(1); this.Location = new Point(this.Left, this.Top + 10); Thread.Sleep(1); this.Location = new Point(this.Left - 10, this.Top);
                MessageBox.Show("请选择一项进行删除！");
            }
            else
            {  //判断用户是否点击确定按钮，true为点击，false为没有点击
                if (MessageBox.Show("确认删除？", "提示信息", MessageBoxButtons.YesNo) == DialogResult.Yes)
                {
                    String str = this.dataGridView4.CurrentRow.Cells[1].Value.ToString();
                    String sql = "delete from MSL where MSLNO ='" + str + "'";
                    SqlCommand cmd = new(sql, conn);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    this.dataGridView4.Rows.Remove(this.dataGridView4.CurrentRow);
                    MessageBox.Show("此行删除成功！");
                }
            }
            conn.Close();
        }
    }
}


```
>管理员可以查询、添加、修改、删除材料信息，除去密码以外的个人信息，实验室信息，借用信息，以及个人信息。
修改个人信息只允许修改密码，修改密码前要校对老密码是否正确和两次输入的新密码是否一致。

界面截图：
>![管理员——材料管理](https://img-blog.csdnimg.cn/20210702213924402.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![管理员——学生信息](https://img-blog.csdnimg.cn/20210702214009781.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![管理员——借用中信息管理](https://img-blog.csdnimg.cn/20210702214054434.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![管理员——实验室设置](https://img-blog.csdnimg.cn/20210702214127351.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![管理员——用户信息设置](https://img-blog.csdnimg.cn/20210702214147818.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)

### 5.guider.cs
代码：
```csharp
using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace 大学实验材料管理信息系统数据库设计
{
    public partial class guider : Form
    {
        public guider()
        {
            InitializeComponent();
            textBox2.Text = DateTime.Now.ToString("yyyy/MM/dd " + "ddd");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            login form1 = new login();
            form1.Show();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            SqlConnection conn = new(login.connectket);
            SqlDataAdapter sda = new SqlDataAdapter("select MSNA AS 材料名,MSNO AS 材料编号,MSLNA AS 实验室名称,MSLNO AS 实验室编号,MSNU AS 材料余量 from MS", conn);
            DataSet ds = new DataSet();//实例化DataSet对象
            sda.Fill(ds);//使用SqlDataAdapter对象的Fill方法填充DataSet            
            dataGridView1.DataSource = ds.Tables[0];//设置dataGridView1控件的数据源
            dataGridView1.RowHeadersVisible = true;//显示行标题
            conn.Close();
        }

        private void guider_Load(object sender, EventArgs e)
        {

        }

        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }
    }
}


```
>以保证公开透明的原则游客登录只允许查看材料信息表

界面截图：
>![游客登录](https://img-blog.csdnimg.cn/20210702214301994.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)

## 打包文件
[大学实验材料管理信息系统数据库设计.zip](https://download.csdn.net/download/RandallChu/19997166)

## 总结
>本实验采用的是实验指导书中实验7、8的方法去做的，过程会稍显复杂。在实验期间主要心得与收获如下： 
>1. 实验本身并不是很难，因为大多的实现方法就是增、删、查、改四项，真正有问题的是实现部分，因为要考虑到各个组件和界面的交互操作；
>2. 代码本身不难写，难的是数据库的设计和界面的美工，这两个方面是这么久一直没有涉及过的，尤其是界面的美工。数据库的设计也是，要详细分析好各个数据项的数据类型，否则编写代码的时候会出现很严重的类型匹配错误；
>3. 学生窗口中的借用选项卡和归还选项卡中的combobox都从数据库中获取信息，当选择第一个combobox中的数据后第二个combobox才会加载信息源；
>4. 借用中记录表BO里面可能会出现相同借用的情况（即同一个人在同一天借了相同数量的相同物品），我创建了一个生成十位核验码的方法*GenerateRandom(int Length)* 每次借用东西的时候都会自动生成一个核验码来确定唯一行；
>5. 我使用的是VS2019里的C#窗体应用，目标框架使用的是.NET5.0；
>6. 完成题目所要求的功能花了两天加一个通宵，很多时候网上的代码不能使用，我只能代码进行重构，这个过程很痛苦，因为有些地方改了之后就会报错，花费很多时间来换条路进行重构。但是结局是开心的，因为最后完成了我的目标，使得代码的整洁度、可读性都得到了不小的提升。


## 写在最后
>*7.3*
>*这次的小学期就很离谱。老师~~王学伟~~就全程不管我们班，问她问题也不耐烦。当她刚刚给女生看完数据库，我们男生想给她看一下我们的数据库设计的怎么样她就不想看，说到时候一起看。我们还去问了好几遍，就是不看。最后在今天下午她不耐烦的花了两分钟来看了我操作程序（只演示了登录，学生页面显示信息和借用）的同时问我问题（算是答辩），最后说不用演示了直接给我了分数。==这个程序在她这里就花了两分钟不到就完成答辩和评分==。我自认为我从0开始（没学过C#和SSMS）写了两天加一个通宵的东西比人家花了半天时间复制粘贴弄出来什么技术含量没有的框架好，但是人家就是分数比我高？==以后的北印信工的同学一定要避坑，别选某些老师的课，真就恶心人，太离谱！！！==*

>*7.5更改*
>*室友问了整个数据库系统设计的评分标准。评高分的标准——使用的语言是否为Java、设计是否插入背景图片（ps：我们都没学过Java连接数据库，C#连接数据库也只是在最后的两个实验里有，她关于用Java或者C#连接数据库一点没说），你这高分全是美观要求为啥不去教设计艺术学院？来嚯嚯我们信工？我们翻遍了整个实验的题目与要求，没有找到一点跟她说的相关的评分标准。我个人认为作为一个老师这样不咋地。你小学期每天在我们实验室待的时间不超过十分钟。在上课时间出去接孩子。一直在隔壁班，有什么通知只跟隔壁班说。再强调一下==以后的北印信工的同学在选课的时候一定要避坑，别选某些老师的课，这某些老师太恶心人，越想越离谱！！！==*
>*附数据库系统设计题目与要求*![数据库系统设计题目与要求1](https://img-blog.csdnimg.cn/20210705104517191.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)
![数据库系统设计题目与要求2](https://img-blog.csdnimg.cn/20210705104604327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1JhbmRhbGxDaHU=,size_16,color_FFFFFF,t_70)

>7.20优化程序算法
>1. 优化数据库，删除部分无用数据库列；
>2. 增加密码加密算法，通过sha256加密算法加密用户密码，将加密后的密码存入数据库；
>3. 更新数据库部分列的表示意义和属性；
>4. 添加了错误操作窗口抖动。

>21.7.22更新日志：
>1. 修复了修改密码报错新旧密码重复的问题
>2. 利用云端服务器数据库替代本地数据库

