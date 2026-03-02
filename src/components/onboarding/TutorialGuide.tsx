import { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { useStore } from '../../store/useStore';

export function TutorialGuide() {
  const hasSeenTutorial = useStore((state) => state.user?.hasSeenTutorial);
  const completeTutorial = useStore((state) => state.completeTutorial);
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Only run if user is onboarded but hasn't seen the tutorial
    const user = useStore.getState().user;
    if (user && user.isOnboarded && !user.hasSeenTutorial) {
      // Add a small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setRun(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenTutorial]);

  const steps: Step[] = [
    {
      target: '.tour-sidebar',
      content: 'Ini adalah menu utama. Kamu bisa navigasi ke semua fitur FIAcademy dari sini.',
      disableBeacon: true,
      placement: 'right',
    },
    {
      target: '.tour-materi',
      content: 'Di sini kamu bisa akses semua video pembelajaran, modul PDF, dan kuis sesuai jurusanmu.',
      placement: 'right',
    },
    {
      target: '.tour-levelbar',
      content: 'Pantau XP dan Levelmu di sini. Semakin sering belajar, semakin cepat naik level!',
      placement: 'bottom',
    },
    {
      target: '.tour-gamification',
      content: 'Cek peringkatmu di Leaderboard dan tukarkan poin dengan hadiah menarik di sini.',
      placement: 'right',
    },
    {
      target: '.tour-bankmateri',
      content: 'Butuh latihan soal atau catatan kuliah? Akses Bank Materi secara gratis!',
      placement: 'right',
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
      completeTutorial();
    }
  };

  if (hasSeenTutorial) return null;

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#2563eb', // blue-600
          textColor: '#0f172a', // slate-900
          backgroundColor: '#ffffff',
          overlayColor: 'rgba(15, 23, 42, 0.6)', // slate-900/60
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: '#2563eb',
          borderRadius: '9999px',
          padding: '8px 16px',
          fontWeight: 'bold',
        },
        buttonBack: {
          color: '#64748b', // slate-500
          marginRight: '8px',
        },
        buttonSkip: {
          color: '#ef4444', // red-500
          fontWeight: 'bold',
        },
      }}
      locale={{
        back: 'Kembali',
        close: 'Tutup',
        last: 'Selesai',
        next: 'Lanjut',
        skip: 'Lewati Tutorial',
      }}
    />
  );
}
