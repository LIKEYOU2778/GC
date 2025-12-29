// src/hooks/useLyrics.ts
import { useState, useEffect } from 'react';

interface LyricLine {
  time: number; // 秒
  text: string;
}

export const useLyrics = (trackName: string, artistName: string, durationMs: number) => {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!trackName || !artistName) return;

    const fetchLyrics = async () => {
      setLoading(true);
      try {
        // 调用 LrcLib API
        const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artistName)}&track_name=${encodeURIComponent(trackName)}&duration=${Math.round(durationMs / 1000)}`;
        
        const res = await fetch(url);
        if (!res.ok) throw new Error('No lyrics found');
        
        const data = await res.json();
        if (data && data.plainLyrics) {
             // 简单的LRC解析逻辑
             const parsedLyrics = parseLrc(data.syncedLyrics || data.plainLyrics); 
             setLyrics(parsedLyrics);
        }
      } catch (err) {
        console.log("Lyrics not found, maybe show generic text");
        setLyrics([{ time: 0, text: "暂无歌词 / 纯音乐" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [trackName, artistName]);

  return { lyrics, loading };
};

// 辅助函数：解析 LRC 格式
const parseLrc = (lrcText: string): LyricLine[] => {
  const lines = lrcText.split('\n');
  const regex = /^\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
  
  return lines.map(line => {
    const match = line.match(regex);
    if (!match) return null;
    const min = parseInt(match[1]);
    const sec = parseInt(match[2]);
    const ms = parseInt(match[3].padEnd(3, '0')); // 补齐3位
    return {
      time: min * 60 + sec + ms / 1000,
      text: match[4].trim()
    };
  }).filter(Boolean) as LyricLine[];
};
