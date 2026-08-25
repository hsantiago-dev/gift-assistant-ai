<!-- Início - Estilo Candy -->
<!DOCTYPE html>

<html class="light" lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Assistente de Presentes - Início</title>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        "colors": {
                "outline": "#907898",
                "on-background": "#2e1a28",
                "on-surface-variant": "#604868",
                "primary": "#e040a0",
                "on-secondary": "#ffffff",
                "on-tertiary-container": "#00334d",
                "surface-container-lowest": "#ffffff",
                "on-secondary-fixed-variant": "#4a3068",
                "secondary-container": "#eedcff",
                "on-tertiary": "#ffffff",
                "on-error": "#ffffff",
                "surface-variant": "#f2e8f2",
                "secondary-fixed": "#eedcff",
                "error": "#e53e3e",
                "surface": "#fef7ff",
                "on-secondary-container": "#2e2040",
                "secondary": "#7c52aa",
                "on-surface": "#2e1a28",
                "surface-tint": "#e040a0",
                "primary-container": "#f080c0",
                "outline-variant": "#dcc8e0",
                "on-error-container": "#9b1c1c",
                "surface-container-high": "#f2e8f2",
                "inverse-on-surface": "#fef7ff",
                "surface-container-low": "#fbf2fb",
                "primary-fixed": "#ffd6ee",
                "tertiary-fixed-dim": "#80d0f0",
                "on-tertiary-fixed-variant": "#005580",
                "primary-fixed-dim": "#f0a0cc",
                "surface-bright": "#fef7ff",
                "error-container": "#ffe8e8",
                "on-primary-container": "#2e1a28",
                "inverse-surface": "#2e1a28",
                "tertiary": "#0096cc",
                "surface-container": "#f8eef8",
                "on-primary-fixed-variant": "#a02070",
                "on-primary-fixed": "#3d0028",
                "inverse-primary": "#f0a0cc",
                "on-primary": "#ffffff",
                "on-secondary-fixed": "#1a1030",
                "surface-dim": "#e0d6e0",
                "secondary-fixed-dim": "#c8a8e8",
                "background": "#fef7ff",
                "surface-container-highest": "#ece2ec",
                "tertiary-container": "#40c0ee",
                "on-tertiary-fixed": "#001a33",
                "tertiary-fixed": "#c8eaff"
        },
        "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
        },
        "spacing": {
            "section-gap": "40px",
            "container-padding": "24px",
            "gutter": "16px",
            "unit": "8px"
        },
        "fontFamily": {
                "headline": [
                        "Dm Sans"
                ],
                "display": [
                        "Dm Sans"
                ],
                "body": [
                        "Dm Sans"
                ],
                "label": [
                        "Dm Sans"
                ]
        },
        "fontSize": {
            "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
            "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
            "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "headline-xl": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
            "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
            "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }],
            "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "500" }]
        }
},
    },
  }
</script>
<style>
        body { background-color: theme('colors.background'); }
        .soft-shadow { box-shadow: 0 10px 30px -5px rgba(224, 64, 160, 0.08); }
        .chip-unselected { border: 1.5px solid theme('colors.outline-variant'); color: theme('colors.on-surface'); background-color: theme('colors.surface-container-lowest'); }
        .chip-selected { background-color: theme('colors.primary'); color: theme('colors.on-primary'); border: 1.5px solid theme('colors.primary'); }
        
        textarea:focus {
            outline: none;
            box-shadow: none;
            border-color: theme('colors.primary');
        }
    </style>
</head>
<body class="min-h-screen text-on-background flex flex-col font-body pb-safe bg-background">
<!-- TopAppBar -->
<header class="bg-surface dark:bg-on-background w-full top-0 sticky flat no shadows z-40">
<div class="flex items-center justify-between px-container-padding h-16 w-full max-w-[1100px] mx-auto">
<div class="flex items-center gap-unit">
<span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim" data-icon="card_giftcard">card_giftcard</span>
<h1 class="font-headline text-headline-md text-primary dark:text-primary-fixed-dim">Assistente de Presentes</h1>
</div>
<!-- Desktop Nav Cluster placeholder -->
<nav class="hidden md:flex gap-gutter">
<a class="text-primary dark:text-primary-fixed-dim flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary rounded-full px-6 py-1 hover:opacity-80 transition-opacity" href="#">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-label text-label-md">Início</span>
</a>
<a class="text-on-surface-variant dark:text-outline-variant flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim px-6 py-1 hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors rounded-full" href="#">
<span class="material-symbols-outlined mb-1">favorite</span>
<span class="font-label text-label-md">Favoritos</span>
</a>
</nav>
</div>
</header>
<main class="flex-grow w-full max-w-[1100px] mx-auto px-container-padding pt-section-gap pb-[100px] md:pb-section-gap flex flex-col items-center justify-start">
<div class="w-full max-w-2xl flex flex-col gap-section-gap">
<!-- Header Text -->
<div class="text-center flex flex-col gap-unit">
<h2 class="font-headline md:font-headline text-headline-lg-mobile md:text-headline-lg text-primary">Para quem é o presente?</h2>
<p class="font-body text-body-lg text-on-surface-variant">Conte um pouco sobre a pessoa e eu te ajudo a encontrar algo especial.</p>
</div>
<!-- Main Input Area -->
<div class="w-full">
<div class="bg-surface-container-lowest rounded-xl p-4 soft-shadow flex flex-col">
<textarea class="w-full h-40 bg-surface-container-low rounded-lg p-6 font-body text-body-md text-on-surface resize-none border-2 border-transparent transition-colors duration-200" placeholder="Ex: Meu irmão faz 30 anos, é apaixonado por games retrô e café especial..."></textarea>
</div>
</div>
<!-- Budgets and Occasions (Bento-ish layout on desktop) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<!-- Orçamento -->
<div class="bg-surface-container-lowest rounded-xl p-container-padding soft-shadow flex flex-col gap-4">
<h3 class="font-label text-label-md text-on-surface-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">payments</span>
                        Orçamento
                    </h3>
<div class="flex flex-wrap gap-2" id="budget-chips">
<button class="chip-selected font-label text-label-md px-5 py-2.5 rounded-full transition-all duration-200">Até R$50</button>
<button class="chip-unselected font-label text-label-md px-5 py-2.5 rounded-full transition-all hover:bg-surface-container-high duration-200">R$50–150</button>
<button class="chip-unselected font-label text-label-md px-5 py-2.5 rounded-full transition-all hover:bg-surface-container-high duration-200">R$150–300</button>
<button class="chip-unselected font-label text-label-md px-5 py-2.5 rounded-full transition-all hover:bg-surface-container-high duration-200">Sem limite</button>
</div>
</div>
<!-- Ocasião -->
<div class="bg-surface-container-lowest rounded-xl p-container-padding soft-shadow flex flex-col gap-4">
<h3 class="font-label text-label-md text-on-surface-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">event</span>
                        Ocasião
                    </h3>
<div class="flex flex-wrap gap-2" id="occasion-chips">
<button class="chip-selected font-label text-label-md px-5 py-2.5 rounded-full transition-all duration-200">Aniversário</button>
<button class="chip-unselected font-label text-label-md px-5 py-2.5 rounded-full transition-all hover:bg-surface-container-high duration-200">Natal</button>
<button class="chip-unselected font-label text-label-md px-5 py-2.5 rounded-full transition-all hover:bg-surface-container-high duration-200">Namorados</button>
<button class="chip-unselected font-label text-label-md px-5 py-2.5 rounded-full transition-all hover:bg-surface-container-high duration-200">Sem motivo especial</button>
<button class="chip-unselected font-label text-label-md px-5 py-2.5 rounded-full transition-all hover:bg-surface-container-high duration-200">Outra</button>
</div>
</div>
</div>
<!-- Generate Button -->
<div class="w-full flex justify-center mt-section-gap">
<button class="bg-primary text-on-primary font-headline text-headline-md px-10 py-5 rounded-full flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all duration-200 shadow-xl shadow-primary/30 w-full md:w-auto justify-center">
<span class="material-symbols-outlined">auto_awesome</span>
                    Gerar sugestões
                </button>
</div>
</div>
</main>
<!-- BottomNavBar (Mobile Only) -->
<script>
        // Simple chip selection logic
        function setupChips(containerId) {
            const container = document.getElementById(containerId);
            if(!container) return;
            const chips = container.querySelectorAll('button');
            
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    // Deselect all
                    chips.forEach(c => {
                        c.classList.remove('chip-selected');
                        c.classList.add('chip-unselected');
                    });
                    // Select clicked
                    chip.classList.remove('chip-unselected');
                    chip.classList.add('chip-selected');
                });
            });
        }

        setupChips('budget-chips');
        setupChips('occasion-chips');
    </script>
</body></html>

<!-- Sugestões - Estilo Candy -->
<!DOCTYPE html><html class="light" lang="pt-BR" style=""><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Resultados - Assistente de Presentes</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        "colors": {
                "outline": "#907898",
                "on-background": "#2e1a28",
                "on-surface-variant": "#604868",
                "primary": "#e040a0",
                "on-secondary": "#ffffff",
                "on-tertiary-container": "#00334d",
                "surface-container-lowest": "#ffffff",
                "on-secondary-fixed-variant": "#4a3068",
                "secondary-container": "#eedcff",
                "on-tertiary": "#ffffff",
                "on-error": "#ffffff",
                "surface-variant": "#f2e8f2",
                "secondary-fixed": "#eedcff",
                "error": "#e53e3e",
                "surface": "#fef7ff",
                "on-secondary-container": "#2e2040",
                "secondary": "#7c52aa",
                "on-surface": "#2e1a28",
                "surface-tint": "#e040a0",
                "primary-container": "#f080c0",
                "outline-variant": "#dcc8e0",
                "on-error-container": "#9b1c1c",
                "surface-container-high": "#f2e8f2",
                "inverse-on-surface": "#fef7ff",
                "surface-container-low": "#fbf2fb",
                "primary-fixed": "#ffd6ee",
                "tertiary-fixed-dim": "#80d0f0",
                "on-tertiary-fixed-variant": "#005580",
                "primary-fixed-dim": "#f0a0cc",
                "surface-bright": "#fef7ff",
                "error-container": "#ffe8e8",
                "on-primary-container": "#2e1a28",
                "inverse-surface": "#2e1a28",
                "tertiary": "#0096cc",
                "surface-container": "#f8eef8",
                "on-primary-fixed-variant": "#a02070",
                "on-primary-fixed": "#3d0028",
                "inverse-primary": "#f0a0cc",
                "on-primary": "#ffffff",
                "on-secondary-fixed": "#1a1030",
                "surface-dim": "#e0d6e0",
                "secondary-fixed-dim": "#c8a8e8",
                "background": "#fef7ff",
                "surface-container-highest": "#ece2ec",
                "tertiary-container": "#40c0ee",
                "on-tertiary-fixed": "#001a33",
                "tertiary-fixed": "#c8eaff"
        },
        "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
        },
        "spacing": {
                        "section-gap": "40px",
                        "container-padding": "24px",
                        "gutter": "16px",
                        "unit": "8px"
                    },
        "fontFamily": {
                "headline": [
                        "Dm Sans"
                ],
                "display": [
                        "Dm Sans"
                ],
                "body": [
                        "Dm Sans"
                ],
                "label": [
                        "Dm Sans"
                ],
                "headline-md": ["DM Sans"],
                        "headline-lg-mobile": ["DM Sans"],
                        "body-md": ["DM Sans"],
                        "headline-xl": ["DM Sans"],
                        "headline-lg": ["DM Sans"],
                        "label-md": ["DM Sans"],
                        "body-lg": ["DM Sans"]
        },
        "fontSize": {
                        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-xl": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                        "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "500" }]
                    },
                    "boxShadow": {
                        "soft-ambient": "0 20px 40px -10px rgba(46, 26, 40, 0.08)"
                    }
    },
    },
  }
</script>
<style>
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .card-hover:active {
            transform: scale(0.98);
            box-shadow: 0 10px 20px -5px rgba(46, 26, 40, 0.05);
        }
    </style>
</head>
<body class="bg-surface text-on-background min-h-screen flex flex-col font-body-md antialiased md:max-w-[1100px] md:mx-auto">
<!-- TopAppBar -->
<header class="w-full top-0 sticky bg-surface flex items-center justify-between px-container-padding h-16 z-10">
<div class="flex items-center gap-2 text-primary">

<h1 class="font-headline-md text-headline-md text-primary">Assistente de Presentes</h1>
</div>
<div class="hidden md:flex gap-6">
<a class="font-label-md text-label-md flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-1 transition-transform hover:opacity-80 active:scale-95" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1;">home</span>
                Início
            </a>
<a class="font-label-md text-label-md flex flex-col items-center justify-center text-secondary px-6 py-1 transition-transform hover:opacity-80 active:scale-95" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 0;">favorite</span>
                Favoritos
            </a>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-grow pb-24 md:pb-8 pt-section-gap flex flex-col">
<div class="px-container-padding mb-section-gap text-center md:text-left">
<h2 class="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-2">Ideias Perfeitas</h2>
<p class="font-body-lg text-body-lg text-secondary max-w-2xl">Encontramos algumas sugestões pensadas com carinho baseadas nas suas respostas.</p>
</div>
<!-- Carousel Section -->
<section class="relative w-full">
<div class="flex overflow-x-auto snap-x snap-mandatory gap-gutter px-container-padding pb-8 no-scrollbar" id="gift-carousel">
<!-- Card 1 -->
<article class="snap-center shrink-0 w-[280px] md:w-[320px] bg-surface-container-lowest rounded-xl shadow-soft-ambient p-4 flex flex-col gap-4 card-hover transition-all duration-300">
<div class="w-full h-48 rounded-[16px] overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A beautifully crafted artisanal ceramic mug filled with rich, steaming coffee, resting on a rustic wooden table. Soft, warm natural sunlight streams through a nearby window, casting gentle shadows. The mood is cozy, inviting, and grounded, evoking a sense of calm morning rituals. The color palette features warm earth tones, deep browns, and off-whites, aligning with a soft, tactile aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAi9ShazLH__2oRufo1D6IChAVzfCW46E_3UroWOS_aKyKNSF7lJHcisZZ18mX3ENWDFtc7uUExgcRyX024A9NULNZtDh6xUcGWDQiGG8jU89CiUDzlaMCcOTzPsrvAusC-yIDmrnQs88VktigKnopH-SgnddtJQZV6RVDmwxvBlUawrgjIEy_B1i9ifG5beeWJDHJIfT8SJEn4MQRnfYU2ogUozUfM6KpNvUHvswCQw4aYEffAjrf">
</div>
<div class="flex flex-col gap-2 flex-grow">
<div class="flex justify-between items-start">
<h3 class="font-headline-md text-headline-md text-on-surface">Caneca Artesanal</h3>
<button aria-label="Favoritar Caneca Artesanal" class="text-secondary hover:text-primary transition-colors">

</button>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
                            Perfeita para as manhãs relaxantes. A textura única e o acabamento manual trazem um toque acolhedor e pessoal, ideal para quem aprecia momentos de pausa.
                        </p>
</div>
</article>
<!-- Card 2 -->
<article class="snap-center shrink-0 w-[280px] md:w-[320px] bg-surface-container-lowest rounded-xl shadow-soft-ambient p-4 flex flex-col gap-4 card-hover transition-all duration-300">
<div class="w-full h-48 rounded-[16px] overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A plush, chunky knit throw blanket draped elegantly over the arm of a comfortable reading chair. The texture of the thick, soft yarn is clearly visible, inviting touch. The setting is a cozy corner of a living room, bathed in gentle, warm ambient light, creating a soothing and comforting atmosphere. The color scheme is dominated by soft creams, warm beiges, and subtle hints of burnt sienna, fitting a nurturing, tactile design style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAAiGN2scYYt88EwIVVny_WE36S_JuXC33uPSzkCfh4mdYQUHg-IiIS3GqpIwUiOxoM2NDAfjGjveDPyqB6DIM48mNzjiNWbuf06ZO6IsFfRTW7jpo-YvcRDs4CZYa8X71P_xC0jC1Iva5OywH87W8TRVUCYFqolIHmkHWm0pC7v5eXH2-iI-jGyDTvSpeiO7HIJ7TdsZX4FsOUYfLmTu4gPfQHIRBDLBKK4Vl9O_IzmO2k2XfZrH4">
</div>
<div class="flex flex-col gap-2 flex-grow">
<div class="flex justify-between items-start">
<h3 class="font-headline-md text-headline-md text-on-surface">Manta de Tricô</h3>
<button aria-label="Favoritar Manta de Tricô" class="text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined">favorite</span>
</button>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
                            Um abraço em forma de presente. Esta manta super macia é o complemento ideal para noites frias assistindo filmes ou lendo um bom livro no sofá.
                        </p>
</div>
</article>
<!-- Card 3 -->
<article class="snap-center shrink-0 w-[280px] md:w-[320px] bg-surface-container-lowest rounded-xl shadow-soft-ambient p-4 flex flex-col gap-4 card-hover transition-all duration-300">
<div class="w-full h-48 rounded-[16px] overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover" data-alt="A beautifully bound journal with a soft, textured leather cover resting next to a sleek fountain pen on a clean, light wooden desk. A small, potted green succulent sits in the background, adding a touch of life. The lighting is soft and diffused, creating a serene environment conducive to reflection and writing. The visual style is minimalist yet warm, utilizing ivory, soft brown, and earthy green tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgKKU-A_VZdA8_xnBBraaZzkxAzJfrJhv3alou1T0JZ7YEX3Qw6rB80INs_Y-THpzJROcOs1ZRy_YVL0giKZ191OJdRjHkzIRP_Z-ts-NkbqINIG-WE91SgS0L1FD8n70dT1hqzCT2qbrVZLhMhVQEOP6fbKDBNvYbCIw5yrLsWMObK5lVdhEftqbJHFMjPso2jKCQ2OIyLUFpW98iz5GSbxA3UBhgGH58ExqCpBN5oKUvotve13RY">
</div>
<div class="flex flex-col gap-2 flex-grow">
<div class="flex justify-between items-start">
<h3 class="font-headline-md text-headline-md text-on-surface">Diário em Couro</h3>
<button aria-label="Favoritar Diário em Couro" class="text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined">favorite</span>
</button>
</div>
<p class="font-body-md text-body-md text-on-surface-variant">
                            Para registrar pensamentos e ideias criativas. O acabamento premium e o papel de alta gramatura tornam a experiência da escrita ainda mais especial.
                        </p>
</div>
</article>
</div>
<!-- Page Indicators -->
<div aria-hidden="true" class="flex justify-center items-center gap-2 mt-4">
<div class="w-2 h-2 rounded-full bg-primary transition-all duration-300"></div>
<div class="w-2 h-2 rounded-full bg-surface-variant transition-all duration-300"></div>
<div class="w-2 h-2 rounded-full bg-surface-variant transition-all duration-300"></div>
</div>
</section>
<!-- Secondary Actions -->
<section class="px-container-padding mt-section-gap flex flex-col items-center gap-6">
<div class="text-center">
<p class="font-label-md text-label-md text-secondary mb-4">2 tentativas restantes</p>
<div class="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
<button class="w-full sm:w-auto px-8 py-4 border-2 border-primary text-primary font-label-md text-label-md rounded-full hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined">refresh</span>
                        Gerar novamente
                    </button>
<button class="w-full sm:w-auto px-6 py-4 text-on-surface-variant font-label-md text-label-md rounded-full hover:bg-surface-variant/50 active:scale-95 transition-all">
                        Limpar
                    </button>
</div>
</div>
</section>
</main>
<!-- BottomNavBar (Mobile Only) -->
<script>
        // Simple scroll spy for carousel indicators
        document.addEventListener('DOMContentLoaded', () => {
            const carousel = document.getElementById('gift-carousel');
            const indicators = document.querySelectorAll('.flex.justify-center.items-center.gap-2 > div');
            
            if(carousel && indicators.length > 0) {
                carousel.addEventListener('scroll', () => {
                    const scrollLeft = carousel.scrollLeft;
                    const cardWidth = carousel.querySelector('article').offsetWidth;
                    // Calculate which card is mostly in view
                    const activeIndex = Math.round(scrollLeft / cardWidth);
                    
                    indicators.forEach((ind, i) => {
                        if (i === activeIndex) {
                            ind.classList.remove('bg-surface-variant');
                            ind.classList.add('bg-primary');
                        } else {
                            ind.classList.remove('bg-primary');
                            ind.classList.add('bg-surface-variant');
                        }
                    });
                });
            }
        });
    </script>


</body></html>

<!-- Estados de Feedback - Estilo Candy -->
<!DOCTYPE html>

<html lang="pt-BR"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Assistente de Presentes - Carregando / Erro</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
  tailwind.config = {
    darkMode: "class",
    theme: {
      extend: {
        "colors": {
                "outline": "#907898",
                "on-background": "#2e1a28",
                "on-surface-variant": "#604868",
                "primary": "#e040a0",
                "on-secondary": "#ffffff",
                "on-tertiary-container": "#00334d",
                "surface-container-lowest": "#ffffff",
                "on-secondary-fixed-variant": "#4a3068",
                "secondary-container": "#eedcff",
                "on-tertiary": "#ffffff",
                "on-error": "#ffffff",
                "surface-variant": "#f2e8f2",
                "secondary-fixed": "#eedcff",
                "error": "#e53e3e",
                "surface": "#fef7ff",
                "on-secondary-container": "#2e2040",
                "secondary": "#7c52aa",
                "on-surface": "#2e1a28",
                "surface-tint": "#e040a0",
                "primary-container": "#f080c0",
                "outline-variant": "#dcc8e0",
                "on-error-container": "#9b1c1c",
                "surface-container-high": "#f2e8f2",
                "inverse-on-surface": "#fef7ff",
                "surface-container-low": "#fbf2fb",
                "primary-fixed": "#ffd6ee",
                "tertiary-fixed-dim": "#80d0f0",
                "on-tertiary-fixed-variant": "#005580",
                "primary-fixed-dim": "#f0a0cc",
                "surface-bright": "#fef7ff",
                "error-container": "#ffe8e8",
                "on-primary-container": "#2e1a28",
                "inverse-surface": "#2e1a28",
                "tertiary": "#0096cc",
                "surface-container": "#f8eef8",
                "on-primary-fixed-variant": "#a02070",
                "on-primary-fixed": "#3d0028",
                "inverse-primary": "#f0a0cc",
                "on-primary": "#ffffff",
                "on-secondary-fixed": "#1a1030",
                "surface-dim": "#e0d6e0",
                "secondary-fixed-dim": "#c8a8e8",
                "background": "#fef7ff",
                "surface-container-highest": "#ece2ec",
                "tertiary-container": "#40c0ee",
                "on-tertiary-fixed": "#001a33",
                "tertiary-fixed": "#c8eaff"
        },
        "borderRadius": {
                "DEFAULT": "1rem",
                "lg": "2rem",
                "xl": "3rem",
                "full": "9999px"
        },
        "spacing": {
            "section-gap": "40px",
            "container-padding": "24px",
            "gutter": "16px",
            "unit": "8px"
        },
        "fontFamily": {
                "headline": [
                        "DM Sans"
                ],
                "display": [
                        "DM Sans"
                ],
                "body": [
                        "DM Sans"
                ],
                "label": [
                        "DM Sans"
                ],
                "headline-md": ["DM Sans"],
                "headline-lg-mobile": ["DM Sans"],
                "body-md": ["DM Sans"],
                "headline-xl": ["DM Sans"],
                "headline-lg": ["DM Sans"],
                "label-md": ["DM Sans"],
                "body-lg": ["DM Sans"]
        },
        "fontSize": {
            "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
            "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
            "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
            "headline-xl": ["40px", { "lineHeight": "48px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
            "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
            "label-md": ["14px", { "lineHeight": "20px", "letterSpacing": "0.01em", "fontWeight": "600" }],
            "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "500" }]
        }
},
    },
  }
</script>
<style>
        .pulse-slow {
            animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 10px 30px rgba(224, 64, 160, 0.15); }
            50% { opacity: .7; transform: scale(0.95); box-shadow: 0 5px 15px rgba(224, 64, 160, 0.05); }
        }
    </style>
</head>
<body class="bg-background text-on-background min-h-screen flex flex-col font-body antialiased">
<!-- TopAppBar -->
<header class="w-full top-0 sticky z-40 bg-surface dark:bg-on-background flat no shadows">
<div class="flex items-center justify-between px-container-padding h-16 w-full">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim" data-icon="card_giftcard" data-weight="fill" style="font-variation-settings: 'FILL' 1;">card_giftcard</span>
<h1 class="font-headline text-headline-md text-primary dark:text-primary-fixed-dim">Assistente de Presentes</h1>
</div>
<!-- Interactive element placeholder for balance -->
<div class="w-8 h-8"></div>
</div>
</header>
<!-- Main Content Area -->
<main class="flex-1 flex flex-col items-center justify-center px-container-padding pb-32 w-full max-w-[1100px] mx-auto">
<!-- Toggle for demonstration purposes -->
<div class="absolute top-20 right-4 z-50 flex gap-2">
<button class="px-4 py-2 bg-surface-container-high rounded-full font-label text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors" onclick="document.getElementById('state-loading').classList.remove('hidden'); document.getElementById('state-error').classList.add('hidden');">Show Loading</button>
<button class="px-4 py-2 bg-error-container rounded-full font-label text-label-md text-on-error-container hover:bg-error transition-colors" onclick="document.getElementById('state-loading').classList.add('hidden'); document.getElementById('state-error').classList.remove('hidden');">Show Error</button>
</div>
<!-- LOADING STATE -->
<div class="flex flex-col items-center justify-center gap-section-gap w-full max-w-md text-center" id="state-loading">
<div class="w-32 h-32 rounded-full bg-primary-container flex items-center justify-center pulse-slow">
<span class="material-symbols-outlined text-6xl text-on-primary-container" data-icon="redeem" data-weight="fill" style="font-variation-settings: 'FILL' 1;">redeem</span>
</div>
<div class="space-y-4">
<h2 class="font-headline md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Pensando em ideias para você...</h2>
<p class="font-body text-body-lg text-on-surface-variant max-w-xs mx-auto">Estamos vasculhando as melhores opções baseadas no perfil que você nos contou.</p>
</div>
<!-- Soft Progress Indicator -->
<div class="flex gap-2 mt-8">
<div class="w-3 h-3 rounded-full bg-primary opacity-100 animate-pulse" style="animation-delay: 0s;"></div>
<div class="w-3 h-3 rounded-full bg-primary opacity-50 animate-pulse" style="animation-delay: 0.2s;"></div>
<div class="w-3 h-3 rounded-full bg-primary opacity-20 animate-pulse" style="animation-delay: 0.4s;"></div>
</div>
</div>
<!-- ERROR STATE (Hidden by default) -->
<div class="flex flex-col items-center justify-center gap-section-gap w-full max-w-md text-center hidden" id="state-error">
<div class="relative w-48 h-48 mb-4">
<div class="absolute inset-0 bg-error-container rounded-full opacity-20 transform -rotate-6"></div>
<div class="absolute inset-0 bg-surface-container-highest rounded-full opacity-50 transform rotate-3"></div>
<div class="relative w-full h-full bg-surface-container-lowest rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(229,62,62,0.08)]">
<span class="material-symbols-outlined text-6xl text-error" data-icon="box_add" data-weight="fill" style="font-variation-settings: 'FILL' 1;">box_add</span>
<!-- Decorative broken elements -->
<span class="absolute top-8 left-8 material-symbols-outlined text-3xl text-outline-variant transform -rotate-12">close</span>
<span class="absolute bottom-10 right-8 material-symbols-outlined text-2xl text-outline-variant transform rotate-45">close</span>
</div>
</div>
<div class="space-y-4">
<h2 class="font-headline md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Ops, não consegui gerar sugestões agora.</h2>
<p class="font-body text-body-lg text-on-surface-variant max-w-sm mx-auto">Parece que nossa fita de presente deu um nó. Não se preocupe, podemos tentar desenrolar isso juntos.</p>
</div>
<button class="mt-8 flex items-center gap-3 px-8 py-4 bg-primary text-on-primary rounded-full hover:bg-surface-tint active:scale-95 transition-all duration-200 shadow-[0_8px_20px_rgba(224,64,160,0.2)]">
<span class="material-symbols-outlined" data-icon="refresh">refresh</span>
<span class="font-label text-label-md">Tentar novamente</span>
</button>
<button class="mt-2 px-6 py-3 font-label text-label-md text-secondary hover:text-on-surface-variant transition-colors rounded-full">
                Voltar ao início
            </button>
</div>
</main>
<!-- BottomNavBar -->
<!-- Displayed on mobile, hidden on desktop if applicable, but context implies a top-level tool -->
</body></html>