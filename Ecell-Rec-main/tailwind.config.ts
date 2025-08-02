// import type { Config } from "tailwindcss";

// const config: Config = {
// 	darkMode: ["class"],
// 	content: [
// 		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
// 		"./components/**/*.{js,ts,jsx,tsx,mdx}",
// 		"./app/**/*.{js,ts,jsx,tsx,mdx}",
// 	],
// 	theme: {
// 		extend: {
// 			fontFamily: {
// 				bebas: ["'Bebas Neue'", "sans-serif"],
// 			},
// 			colors: {
// 				background: 'hsl(var(--background))',
// 				foreground: 'hsl(var(--foreground))',
// 				mylavender: 'rgb(197, 174, 251)',
// 				card: {
// 					DEFAULT: 'hsl(var(--card))',
// 					foreground: 'hsl(var(--card-foreground))'
// 				},
// 				popover: {
// 					DEFAULT: 'hsl(var(--popover))',
// 					foreground: 'hsl(var(--popover-foreground))'
// 				},
// 				primary: {
// 					DEFAULT: 'hsl(var(--primary))',
// 					foreground: 'hsl(var(--primary-foreground))'
// 				},
// 				secondary: {
// 					DEFAULT: 'hsl(var(--secondary))',
// 					foreground: 'hsl(var(--secondary-foreground))'
// 				},
// 				muted: {
// 					DEFAULT: 'hsl(var(--muted))',
// 					foreground: 'hsl(var(--muted-foreground))'
// 				},
// 				accent: {
// 					DEFAULT: 'hsl(var(--accent))',
// 					foreground: 'hsl(var(--accent-foreground))'
// 				},
// 				destructive: {
// 					DEFAULT: 'hsl(var(--destructive))',
// 					foreground: 'hsl(var(--destructive-foreground))'
// 				},
// 				border: 'hsl(var(--border))',
// 				input: 'hsl(var(--input))',
// 				ring: 'hsl(var(--ring))',
// 				chart: {
// 					'1': 'hsl(var(--chart-1))',
// 					'2': 'hsl(var(--chart-2))',
// 					'3': 'hsl(var(--chart-3))',
// 					'4': 'hsl(var(--chart-4))',
// 					'5': 'hsl(var(--chart-5))'
// 				},
// 				'color-1': 'hsl(var(--color-1))',
// 				'color-2': 'hsl(var(--color-2))',
// 				'color-3': 'hsl(var(--color-3))',
// 				'color-4': 'hsl(var(--color-4))',
// 				'color-5': 'hsl(var(--color-5))'
// 			},
// 			borderRadius: {
// 				lg: 'var(--radius)',
// 				md: 'calc(var(--radius) - 2px)',
// 				sm: 'calc(var(--radius) - 4px)'
// 			},
// 			animation: {
// 				grid: 'grid 15s linear infinite',
// 				rainbow: 'rainbow var(--speed, 2s) infinite linear',
// 				shine: 'shine var(--duration) infinite linear',
// 				marquee: 'marquee var(--duration) infinite linear',
// 				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
// 			},
// 			keyframes: {
// 				grid: {
// 					'0%': {
// 						transform: 'translateY(-50%)'
// 					},
// 					'100%': {
// 						transform: 'translateY(0)'
// 					}
// 				},
// 				rainbow: {
// 					'0%': {
// 						'background-position': '0%'
// 					},
// 					'100%': {
// 						'background-position': '200%'
// 					}
// 				},
// 				shine: {
// 					'0%': {
// 						'background-position': '0% 0%'
// 					},
// 					'50%': {
// 						'background-position': '100% 100%'
// 					},
// 					to: {
// 						'background-position': '0% 0%'
// 					}
// 				},
// 				marquee: {
// 					from: {
// 						transform: 'translateX(0)'
// 					},
// 					to: {
// 						transform: 'translateX(calc(-100% - var(--gap)))'
// 					}
// 				},
// 				'marquee-vertical': {
// 					from: {
// 						transform: 'translateY(0)'
// 					},
// 					to: {
// 						transform: 'translateY(calc(-100% - var(--gap)))'
// 					}
// 				}
// 			}
// 		}
// 	},
// 	plugins: [
// 		function addGlobalCSSVariables({ addBase, theme }: { addBase: (base: Record<string, string>) => void; theme: (path: string) => Record<string, string> }) {
// 			const colors = theme("colors");
// 			const cssVars: Record<string, string> = {};

// 			for (const [key, value] of Object.entries(colors)) {
// 				if (typeof value === "string") {
// 					cssVars[`--${key}`] = value;
// 				} else if (typeof value === "object" && value !== null) {
// 					// Ensure 'value' is an object and not null
// 					for (const [subKey, subValue] of Object.entries(value)) {
// 						if (typeof subValue === "string") {
// 							cssVars[`--${key}-${subKey}`] = subValue;
// 						}
// 					}
// 				}
// 			}

// 			addBase({
// 				":root": cssVars as unknown as string,
// 			});
// 		},
// 	],
// };

// export default config;





import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}", // from register
    "./register/**/*.{js,ts,jsx,tsx,mdx}", // in case /register is separate
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        bebas: ["'Bebas Neue'", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        mylavender: "rgb(197, 174, 251)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-register": "var(--gradient-register)",
      },
      boxShadow: {
        "glow-primary": "var(--glow-primary)",
        "glow-accent": "var(--glow-accent)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        grid: "grid 15s linear infinite",
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        shine: "shine var(--duration) infinite linear",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
        shine: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          to: { "background-position": "0% 0%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function addGlobalCSSVariables({ addBase, theme }: { addBase: any; theme: any }) {
      const colors = theme("colors");
      const cssVars: Record<string, string> = {};

      for (const [key, value] of Object.entries(colors)) {
        if (typeof value === "string") {
          cssVars[`--${key}`] = value;
        } else if (typeof value === "object" && value !== null) {
          for (const [subKey, subValue] of Object.entries(value)) {
            if (typeof subValue === "string") {
              cssVars[`--${key}-${subKey}`] = subValue;
            }
          }
        }
      }

      addBase({
        ":root": cssVars,
      });
    },
  ],
};

export default config;



