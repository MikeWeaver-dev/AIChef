import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Rocket, ExternalLink } from 'lucide-react-native';

export default function OtherApps() {
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-[#fff4e6]">
      <View className="px-4 pt-8 mt-10">
        {/* Header Section */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-orange-400 items-center justify-center mb-5 shadow-lg shadow-orange-400/50">
            <Rocket color="#fff" size={40} />
          </View>
          <Text className="text-[42px] font-bold text-orange-800 mb-2 text-center">My Projects</Text>
          <Text className="text-lg text-orange-900 text-center font-medium">Explore my other work</Text>
        </View>

        {/* Intro Text */}
        <View className="bg-orange-50 rounded-2xl p-5 mb-6 border-l-4 border-orange-300 shadow-md">
          <Text className="text-[15px] text-gray-600 leading-6">
            I've built several projects spanning web development, data visualization, and AI integration. 
            Each one represents a unique challenge and learning experience. Click any project to learn more!
          </Text>
        </View>

        {/* Project Cards */}
        <ProjectCard
          title="MikeWeaver.dev"
          description="My portfolio website showcasing all my coding projects, technical qualifications, resume, and source code. Your one-stop destination to explore my work."
          tags={['Portfolio', 'Web Dev', 'Full Stack']}
          link="https://Mikeweaver.dev"
          onPress={openLink}
          accentColor="bg-green-400/60"
          borderColor="border-green-500/60"
          textColor="text-green-500/60"
          glowColor="bg-green-500/60"
        />

        <ProjectCard
          title="CensusView"
          description="An interactive visualization tool leveraging millions of Census data points to map demographic and housing trends at the state, county, and neighborhood level."
          tags={['Data Viz', 'Analytics', 'GIS', 'R']}
          link="https://Mikeweaver.dev/CensusView"
          onPress={openLink}
          accentColor="bg-blue-300"
          borderColor="border-blue-400"
          textColor="text-blue-400"
          glowColor="bg-blue-400"
        />

        <ProjectCard
          title="Voyage"
          description="A working and scalable social media platform where users can post about their travels and experiences. Built with modern web technologies and real-time features."
          tags={['Firebase', 'Full Stack', 'CRUD', 'React']}
          link="https://Mikeweaver.dev/Voyage"
          onPress={openLink}
          accentColor="bg-purple-300"
          borderColor="border-purple-400"
          textColor="text-purple-400"
          glowColor="bg-purple-400"
        />

        <ProjectCard
          title="SpotifyLab"
          description="Available on iOS and Android, this app uses artificial intelligence to generate personalized playlists based on user inputs and Spotify listening history."
          tags={['AI Integration', 'Spotify API', 'Mobile Development']}
          link="https://Mikeweaver.dev/SpotifyLab"
          onPress={openLink}
          accentColor="bg-pink-300"
          borderColor="border-pink-400"
          textColor="text-pink-400"
          glowColor="bg-pink-400"
        />

        <View className="h-10" />
      </View>
    </ScrollView>
  );
}

function ProjectCard({ title, description, tags, link, onPress, accentColor, borderColor, textColor, glowColor }) {
  return (
    <View className="mb-6 relative shadow-lg">
      <View className={`absolute -inset-[2px] rounded-[18px] ${glowColor} opacity-15`} />
      <View className="bg-orange-50 rounded-2xl p-5 shadow-lg overflow-hidden">
        {/* Accent strip at top */}
        <View className={`absolute top-0 left-0 right-0 h-1 ${accentColor}`} />
        
        <Text className="text-[22px] font-bold text-gray-800 mb-3 mt-2">{title}</Text>
        
        {/* Tags */}
        <View className="flex-row flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <View key={index} className={`px-3 py-1.5 rounded-xl border-[1.5px] ${borderColor} shadow-sm bg-orange-50`}>
              <Text className={`text-xs font-semibold ${textColor}`}>{tag}</Text>
            </View>
          ))}
        </View>
        
        <Text className="text-[15px] text-gray-600 leading-[23px] mb-8">{description}</Text>
        
        <TouchableOpacity
          className={`flex-row items-center justify-center gap-2 py-3 rounded-xl ${accentColor} shadow-md`}
          onPress={() => onPress(link)}
          activeOpacity={0.8}
        >
          <Text className="text-white text-base font-semibold">Visit Project</Text>
          <ExternalLink color="#fff" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
}