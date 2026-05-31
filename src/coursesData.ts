/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course } from './types';

export const coursesData: Course[] = [
  {
    id: 'photo-editing',
    title: {
      om: 'Gulaallii Suuraa (Premium)',
      en: 'Premium Photo Editing'
    },
    subtitle: {
      om: 'Gulaallii suuraa professional ta\'e, hojii Fiverr portfolio beekamaa.',
      en: 'Master professional level photo editing and build your Fiverr portfolio.'
    },
    description: {
      om: 'Koozii kanaan gulaallii suuraa olaanaa, barruu suuraatti dabaluu, background jijjiiruu, fi dandeettii daldalaa Fiverr fi Upwork irratti qabaachuu dandeessu si barsiisa.',
      en: 'Complete guide to professional-grade photo editing, object isolation, advanced coloring, and establishing high-demand freelancing portfolios.'
    },
    category: 'editing',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600',
    bannerGradient: 'from-blue-600 to-indigo-800',
    lessons: [
      {
        id: 'pe-l1',
        courseId: 'photo-editing',
        title: {
          om: 'Filannoo fi Adda Baasuu',
          en: 'Object Isolation & Selection'
        },
        description: {
          om: 'Mee background fi meeshaalee suuraa keessaa akkamitti akka adda baasnu haa barannu.',
          en: 'Learn precise pen tool selection, brush masking, and hair extraction for professional compositing.'
        },
        duration: '12 min',
        videoMockupType: 'crop',
        contentMarkdown: {
          om: '### Gulaallii Suuraa: Filannoo Hojjachuu\n\n1. **Meeshaa Pen Tool (Meeshaa Qalamu)**: qarmixa suuraa keessanii qofatti filuuf gargaara.\n2. **Masking (Uffisuu)**: Background hinfurina malee dhabamsiisuuf gargaara.\n3. **Fiverr Portfolio**: Hojii keessan jalqabaa bifa kanaan midgsuu dandeessu.\n\n*Amanuel Harar irraa siif gorsa:* "Harar keessatti suuraawwan dilaalaa kanaan jallachisna!"',
          en: '### Photo Isolation & Subject Extraction\n\n1. **Advanced Pen Tool**: Precise path creation around objects to separate them cleanly.\n2. **Layer Masking**: Non-destructive workflows for background blending and shadow adjustment.\n3. **Portfolio Tip**: Create an eye-catching before/after layout to attract international paying clients.'
        }
      },
      {
        id: 'pe-l2',
        courseId: 'photo-editing',
        title: {
          om: 'Madaallii fi Wal-Simannaa Halluu',
          en: 'Color Balance & Color Grading'
        },
        description: {
          om: 'Halluu madaaluu, qulqullina suuraa fooyyessuu fi moodii uumuu.',
          en: 'Understand color theory, curve tools, and creating cinematic atmospheres in photos.'
        },
        duration: '15 min',
        videoMockupType: 'filter',
        contentMarkdown: {
          om: '### Madaallii Halluu (Color Grading)\n\n* **RGB Curves**: Diimaa, magariisa fi cuquliisa madaaluun qulqullina simataa kennuu.\n* **Saturation fi Vibrance**: Halluu ifaa fi baddanii uumuu.\n* **Levels Adjustment**: Shadow fi Highlight gidduu garaagarummaa sirreessuu.',
          en: '### Color Balance & Cinematic Grading\n\n* **RGB Curves**: Individually manipulate Red, Green, and Blue channels to form custom moods.\n* **Highlight Recovery**: Restore overexposed highlights using camera-raw filters.\n* **Consistent Brand Styling**: Generate custom LUT presets to edit batch photos in seconds.'
        }
      },
      {
        id: 'pe-l3',
        courseId: 'photo-editing',
        title: {
          om: 'Gulaallii Fuulaa fi Gogaa (Retouching)',
          en: 'Portrait Skin Retouching'
        },
        description: {
          om: 'Gogaa fuulaa qulqulleessuu fi bifa bilisa ta\'ee uumuu.',
          en: 'Master frequency separation, blemish removal, and realistic skin texturing.'
        },
        duration: '18 min',
        videoMockupType: 'adjust',
        contentMarkdown: {
          om: '### Portrait Retouching Premium\n\n1. **Frequency Separation**: Gogaa fi halluu fuulaa gargar baasanii midgsuu.\n2. **Heal Brush**: Cittoo fi xurii gogaarraa dhabamsiisuuf.\n3. **Dodge & Burn**: Ifa fi gaaddidduu fuularra jiru madaaluu.',
          en: '### Frequency Separation & High-End Retouching\n\n1. **Frequency Separation**: Split texture detail from color tone for natural corrections.\n2. **Healing Brush Tool**: Easily remove minor blemishes without losing underlying details.\n3. **Dodge & Burn**: Manually paint shadows and highlights to pop structural cheekbones.'
        }
      }
    ],
    quizzes: [
      {
        id: 'pe-q1',
        question: {
          om: 'Background suuraa tokkoo bifa bittinnaa\'e malee dhabamsiisuuf meeshaa kamtu hundarra gaarii dha?',
          en: 'Which technique represents the safest non-destructive method to hide a background?'
        },
        options: {
          om: ['Eraser Tool', 'Layer Mask', 'Quick Selection Tool', 'Magic Wand'],
          en: ['Eraser Tool', 'Layer Mask', 'Quick Selection Tool', 'Magic Wand']
        },
        correctIndex: 1,
        explanation: {
          om: 'Layer Mask ijaaruun pixel dhabamsiisuu malee yeroo barbaannetti deebisuuf gargaara, qulqullina olaanaaf filatama.',
          en: 'Layer Masks are non-destructive, meaning you do not permanently delete pixels and can recover details anytime!'
        }
      },
      {
        id: 'pe-q2',
        question: {
          om: 'Curves tool fayyadamuun maaliif gargaara?',
          en: 'What is the primary function of the Curves Adjustment tool?'
        },
        options: {
          om: ['Suuraa muruudhaaf', 'Garaagarummaa ifaa fi halluu madaaluuf', 'Suuraa gubbaa qubee barruu uumuuf', 'Suuraa gara viidiyootti jijjiiruuf'],
          en: ['Image Cropping', 'Controlling tonal values and color channels', 'Creating vector paths', 'Exporting video layers']
        },
        correctIndex: 1,
        explanation: {
          om: 'Curves tooln tonal values (highlight/shadow) fi halluu channels sirreessuuf meeshaa dandeettii olaanaati.',
          en: 'Curves give pinpoint control over specific tonal areas from deep shadows to high highlights.'
        }
      }
    ]
  },
  {
    id: 'graphic-design',
    title: {
      om: 'Graphic Design Guutuu',
      en: 'Full Graphic Design'
    },
    subtitle: {
      om: 'Seensa Figma, uumama logo, beeksisa, fi diizaayiniilee garaa garaa.',
      en: 'Figma principles, logo creation, typography rules, and vector mechanics.'
    },
    description: {
      om: 'Mee Figma keessatti logo ijaaruu, UI layouts, fi beeksisawwan babbaddoo akkamitti akka hojjatamu haa barannu. Dandeettii canva fi illustrator caalurratti hundaa\'a.',
      en: 'Comprehensive foundation in vector layout, UI frames in Figma, typography hierarchy, and business branding templates.'
    },
    category: 'graphic',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600',
    bannerGradient: 'from-emerald-600 to-teal-800',
    lessons: [
      {
        id: 'gd-l1',
        courseId: 'graphic-design',
        title: {
          om: 'Seensa Saxaxa Figma',
          en: 'Figma Workspace & Frames'
        },
        description: {
          om: 'Figma keessatti saxaxa ijaaruu fi bifa qulqulluu qabuun hojjachuuf seensa.',
          en: 'Dive into the Figma canvas, utilizing frames, layout grids, and modern components.'
        },
        duration: '14 min',
        videoMockupType: 'grid',
        contentMarkdown: {
          om: '### Seensa Figma Workspace\n\n1. **Frames (Keessoo)**: Saxaxa tokkoef hundee (desktop fi mobile qopheessuu).\n2. **Grid Layout**: Diizaayiniin keessan sirriitti wal-fakkaatee akka qubatu gochuuf.\n3. **Components**: Bifa adda addaa yeroo baay\'ee fayyadamtan kooppii gochuuf gargaara.',
          en: '### Mastering the Figma Grid\n\n1. **Frames Over Groups**: Frames act as viewports that allow responsive constraints initialization.\n2. **Layout Grids**: Create rigid column-based grids to keep spacings visually uniform.\n3. **Main Components**: Build once, distribute instances, and update everything in a single change.'
        }
      },
      {
        id: 'gd-l2',
        courseId: 'graphic-design',
        title: {
          om: 'Saxaxa Logo fi Beeksisawwan',
          en: 'Logo Architecture & Vectors'
        },
        description: {
          om: 'Geometrii logo, bifawwan jajjaboo, fi asoosama daldalaatiif logo uumuu.',
          en: 'Understand vector paths, boolean operations, and symbolic minimalist logo design.'
        },
        duration: '16 min',
        videoMockupType: 'vector',
        contentMarkdown: {
          om: '### Geometrii Logo Ijaaruu\n\n* **Boolean Operations**: Bifawwan adda addaa (Hir\'isuu, walitti fiduu) foyyessuuf.\n* **Minimalism**: Logo gaariin kan hinirraanfatamne fi salphaa ta\'e dha.\n* **Vector Paths**: Diizaayiniin keessan yoo bal\'atees akka hin-baddne gochuudhaaf.',
          en: '### Vector Mathematics in Brand Design\n\n* **Boolean Geometry**: Intersect, exclude, or union simple geometric shapes to build clean logos.\n* **Scalability**: Vector paths scale infinitely without rasterization (no pixelation!).\n* **Memorability**: Keep it simple. A powerful brand can be drawn from memory in 5 seconds.'
        }
      },
      {
        id: 'gd-l3',
        courseId: 'graphic-design',
        title: {
          om: 'Barruu fi Haala Tarreeffama Sagantaa',
          en: 'Typography Rules'
        },
        description: {
          om: 'Font madaaluu, qubeewwan bakka qabsiisuu, fi visual hierarchy barruu.',
          en: 'Select perfect typefaces, pairing principles, and readability rules.'
        },
        duration: '11 min',
        videoMockupType: 'typography',
        contentMarkdown: {
          om: '### Teeknoolojii Qubee (Typography)\n\n1. **Font Pairings**: Sans-Serif fi Serif akkamitti walitti hidhamu.\n2. **Line Height (Dheerina Sararaa)**: Dubbisuuf akka nama hin rakkisne.\n3. **Visual Hierarchy**: Garaagarummaa maayila guddaa fi xiqqaa gidduu jiru.',
          en: '### Typography Pairings & Hierarchy\n\n1. **Contrast is King**: Combine a strong geometric display head with an organic serif body.\n2. **Line Height Rules**: For readable bodies, use 1.4x to 1.6x of the font size for line height.\n3. **Letter Tracking**: Expand tracking for uppercase subheads to feel premium.'
        }
      }
    ],
    quizzes: [
      {
        id: 'gd-q1',
        question: {
          om: 'Figma keessatti "Component" fayyadamuun faayidaan isaa maali?',
          en: 'What is the primary advantage of a Component in Figma?'
        },
        options: {
          om: ['Suuraa badde deebisuu', 'Diizaayinii koopppii ta\'e hunda bakka tokkotti jijjiiruuf', 'Halluu dhabamsiisuuf', 'Kompiitara saffisiisuuf'],
          en: ['To recover deleted assets', 'To globally update nested instances from a single master element', 'To change colors only', 'To speed up computer rendering']
        },
        correctIndex: 1,
        explanation: {
          om: 'Master component tokko sirreessinaan, kooppiiwwan (instances) hundinuu ofumaan bakka jirutti jijjiiramu.',
          en: 'Modifying the master component propagates all styling changes instantly to all instances across your layout.'
        }
      }
    ]
  },
  {
    id: 'video-editing',
    title: {
      om: 'Gulaallii Viidiyoo (Premium)',
      en: 'Premium Video Editing'
    },
    subtitle: {
      om: 'TikTok, YouTube bifa dammaqe qabuun gulaaluu fi hook uumuu.',
      en: 'High retention video editing, attention hooks, and Premiere mechanics.'
    },
    description: {
      om: 'Gulaallii viidiyoo TikTok, YouTube, fi beeksisawwan daldalaaf beekamoo tahan, sound effects guutuu fi dhiyaatinsawwan hammayyaa barsiisa.',
      en: 'Master frame-by-frame timing, audio layer sync, viral transitions, and rendering parameters for maximum video quality on social media.'
    },
    category: 'video',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600',
    bannerGradient: 'from-purple-600 to-indigo-900',
    lessons: [
      {
        id: 've-l1',
        courseId: 'video-editing',
        title: {
          om: 'Beekumsa Gulaallii Yeroo (Timeline)',
          en: 'Timeline Mechanics & Cuts'
        },
        description: {
          om: 'Mormii yeroo viidiyoo, bakka muruun barbaachisuu fi cuts sirreessuu.',
          en: 'Learn the sequence timeline, J-cuts, L-cuts, and pacing for high user retention.'
        },
        duration: '15 min',
        videoMockupType: 'timeline',
        contentMarkdown: {
          om: '### Sirreessa Timeline (Muriinsa)\n\n1. **A-Roll & B-Roll**: Viidiyoo dubbiifi, viidiyoo dabalataa gidduu madaaluu.\n2. **J-Cut**: Sagalee viidiyoo dhuftuun dura dhagahamu.\n3. **L-Cut**: Sagalee viidiyoo durattii darberraa hafe.',
          en: '### Mastering Cuts and Storyboard Flow\n\n1. **A-Roll & B-Roll**: Anchor your audience with main speech (A-Roll) and contextual overlays (B-Roll).\n2. **J-Cuts**: Connect adjacent scenes by bringing in the audio of the upcoming shot early.\n3. **L-Cuts**: Let the previous scene\'s dialogue linger briefly over the newly cut background.'
        }
      },
      {
        id: 've-l2',
        courseId: 'video-editing',
        title: {
          om: 'Madaallii Sagalee fi Sound Effects (SFX)',
          en: 'Audio Calibration & SFX'
        },
        description: {
          om: 'Mee sagalee qulqulluu fi sound effects dynamic gochuuf fiduu dandeessan haa barannu.',
          en: 'Calibrate voice frequencies, background ambiance, and impact sound effects.'
        },
        duration: '12 min',
        videoMockupType: 'audio',
        contentMarkdown: {
          om: '### Kalibreessuu Sagalee\n\n* **Ambiance**: Sagalee background gadi buksuun sagalee dhuunfaa jabeessuu.\n* **Sound Effects (SFX)**: Swooshes, typing sound uumuun dandeettii dammaqsuu.\n* **Vocal EQ**: Sagalee humna kennuu (Bass boosting).',
          en: '### Dynamic Audio Editing\n\n* **Vocal Compressor**: Keep vocal expressions tight, making whispers and shouts equal in dynamic volume.\n* **Strategic SFX**: Use whooshes on slide transitions and subtle clicks on pop-up texts.\n* **Audio Ducking**: Automatically lower background music by -12dB when a voiceover track is speaking.'
        }
      },
      {
        id: 've-l3',
        courseId: 'video-editing',
        title: {
          om: 'Qulqullina Ol-Aanaa fi Exporting',
          en: 'Render & Compression Quality'
        },
        description: {
          om: 'Codecs sirreessuu, qulqullina 1080p fi 4K uumuun export gochuu.',
          en: 'Configure H.264 profiles, keyframes, and bitrate optimization.'
        },
        duration: '16 min',
        videoMockupType: 'render',
        contentMarkdown: {
          om: '### Specs Exporting Viidiyoo\n\n1. **H.264 Codec**: Saffisa daraan dabaluu fi qulqullina gaarii qabaachuu.\n2. **Bitrate**: 1080p TikTok sfarra 15-20 Mbps gaarii dha.\n3. **Color Profile**: Rec. 709 qilleensa hundumaaf gaha.',
          en: '### Optimal Social Compression Specs\n\n1. **H.264 MP4**: Universal video wrap that renders across Web browsers and iOS devices seamlessly.\n2. **Bitrate Sweet Spot**: Target 15 Mbps for supreme 1080p 60fps social network uploads.\n3. **Render Check**: Check "Use Maximum Render Quality" to scale graphic layers seamlessly.'
        }
      }
    ],
    quizzes: [
      {
        id: 've-q1',
        question: {
          om: '"J-cut" fi "L-cut" dhiibbaa akkamii uumu?',
          en: 'What is the visual advantage of J-cuts and L-cuts?'
        },
        options: {
          om: ['Sagalee dhabamsiisu', 'Scene-onni akka wal-sassaabanii fi sirriitti wal-simatan ta\'u', 'Viidiyoo gabaabsaniif', 'Viidiyoo halluu jijjiiruuf'],
          en: ['They mute the voice completely', 'They make edits feel unified, seamless, and less jarring', 'They automatically crop the video frame to vertical aspect ratios', 'They trigger custom graphic renderings']
        },
        correctIndex: 1,
        explanation: {
          om: 'Cuts kunneen scene-onni yoo jijjiiraman akka sagaleen dursu ykn hafuun seamless dabalata uuma.',
          en: 'By overlapping audio and video boundaries, transitions feel entirely continuous and natural rather than disjointed.'
        }
      }
    ]
  }
];
