import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { User, Code, Sparkles, Heart } from 'lucide-react-native';

export default function About() {
  return (
    <ScrollView className="flex-1 bg-[#fff4e6]">
      <View className="px-4 pt-8 mt-10">
        {/* Header Section */}
        <View className="items-center mb-9">
          <View className="w-20 h-20 rounded-full bg-orange-400 items-center justify-center mb-5 shadow-lg shadow-orange-400/50">
            <User color="#fff" size={40} />
          </View>
          <Text className="text-[42px] font-bold text-orange-800 mb-2 text-center">About Me</Text>
          <Text className="text-lg text-orange-900 text-center font-medium">Developed by Mike Weaver</Text>
        </View>

        {/* Intro Card */}
        <View className="mb-5 relative">
          <View className="absolute -inset-[3px] rounded-[20px] bg-orange-400 opacity-25" />
          <View className="bg-orange-50 rounded-[18px] p-6 shadow-lg">
            <View className="flex-row items-center mb-4 gap-3">
              <Sparkles color="#c2410c" size={24} />
              <Text className="text-[22px] font-bold text-orange-800">My Story</Text>
            </View>
            <Text className="text-base text-gray-700 leading-[26px]">
              My love for coding began summer of 2019, when a finance internship turned to full-time software development and automation work. After I graduated from UNC in 2020, I began work at a boutique consulting firm, believing a business and analytics career was the right choice for me. But I couldn't get away from coding, often automating tasks and building applications or dynamic tools for clients. After five years with the consulting company, I decided to quit my job and pursure a career in software development. The app you are currently viewing and the apps outlined on the "Other Apps" tab are all part of a portfolio I've developed to showcase my codings skills and switch career paths. I hope you enjoy! 
            </Text>
          </View>
        </View>

        {/* Journey Card */}
        <View className="mb-5 relative">
          <View className="absolute -inset-[3px] rounded-[20px] bg-orange-400 opacity-25" />
          <View className="bg-orange-50 rounded-[18px] p-6 shadow-lg">
            <View className="flex-row items-center mb-4 gap-3">
              <Code color="#c2410c" size={24} />
              <Text className="text-[22px] font-bold text-orange-800">Development Journey</Text>
            </View>
            <Text className="text-base text-gray-700 leading-[26px]">
              This is my third major coding project and my first venture into mobile app development. I wanted to create 
              something that combines AI integration with a compelling and refined UI. The software helps users discover 
              recipes based on ingredients they already have. The app was built in expo and is available for Android and Apple, with a website also available for desktop users. 
            </Text>
          </View>
        </View>

        {/* Philosophy Card */}
        <View className="mb-5 relative">
          <View className="absolute -inset-[3px] rounded-[20px] bg-orange-400 opacity-25" />
          <View className="bg-orange-50 rounded-[18px] p-6 shadow-lg">
            <View className="flex-row items-center mb-4 gap-3">
              <Heart color="#c2410c" size={24} />
              <Text className="text-[22px] font-bold text-orange-800">Design Philosophy</Text>
            </View>
            <Text className="text-base text-gray-700 leading-[26px]">
              I've never had any formal coding training. I didn't take any comp-sci classes in college, and I haven't done any bootcamps or online courses. For me, doing work on the job is the best way to learn. Getting stuck, pulling my hair out, pouring over Stack Exchange and then finally getting a working product is one of the best feelings in the world. As I advance and improve my coding abilities, I try to push myself towards unique projects that require new skills. My last job was data and GIS heavy. This portfolio is web-development heavy, and this app is my first take on AI-integration and mobile development. I learned a lot while creating this portfolio, and I hope to keep making new exciting applications, websites, and tools that expand my software development knowledge.  
            </Text>
          </View>
        </View>

        {/* Tech Stack Card */}
        <View className="mb-5 relative">
          <View className="absolute -inset-[3px] rounded-[20px] bg-orange-400 opacity-30" />
          <View className="bg-orange-50 rounded-[18px] p-6 shadow-lg">
            <Text className="text-[22px] font-bold text-orange-900 mb-4 text-center">Built With</Text>
            <View className="flex-row flex-wrap gap-2.5 justify-center">

              <View className="bg-orange-200 px-4 py-2.5 rounded-full border-2 border-orange-400 shadow-sm shadow-orange-400/20">
                <Text className="text-orange-800 text-sm font-semibold">React Native</Text>
              </View>
              <View className="bg-orange-200 px-4 py-2.5 rounded-full border-2 border-orange-400 shadow-sm shadow-orange-400/20">
                <Text className="text-orange-800 text-sm font-semibold">Nativewind</Text>
              </View>
              <View className="bg-orange-200 px-4 py-2.5 rounded-full border-2 border-orange-400 shadow-sm shadow-orange-400/20">
                <Text className="text-orange-800 text-sm font-semibold">Firebase</Text>
              </View>
              <View className="bg-orange-200 px-4 py-2.5 rounded-full border-2 border-orange-400 shadow-sm shadow-orange-400/20">
                <Text className="text-orange-800 text-sm font-semibold">Expo</Text>
              </View>
              <View className="bg-orange-200 px-4 py-2.5 rounded-full border-2 border-orange-400 shadow-sm shadow-orange-400/20">
                <Text className="text-orange-800 text-sm font-semibold">AI Integration</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer Message */}
        <View className="bg-orange-50 rounded-2xl p-5 border-l-4 border-orange-400 shadow-lg">
          <Text className="text-[15px] text-gray-600 leading-6 italic">
            Thanks for checking out my app! I hope it helps you discover new meals and makes cooking more enjoyable. 
            Feel free to explore my other projects in the "Other Apps" tab.
          </Text>
        </View>

        <View className="h-10" />
      </View>
    </ScrollView>
  );
}