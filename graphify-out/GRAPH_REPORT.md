# Graph Report - PlantPDF  (2026-10-27)

## Corpus Check
- 127 files · ~271,689 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 32 file(s) not represented in the graph (top: .ttf 20, (none) 5, .css 3)

## Summary
- 2119 nodes · 6536 edges · 94 communities (75 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 224 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0cee153`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Inspector & Font Panels
- ui/recovery.js
- Site Plan Geometry
- Text Edit Mode
- PDF Form Fields
- Studio Rendering & Wiring
- app.js
- PDF Session Core
- Release Workflow
- model.js
- content-stream.js
- Manual Builder
- Package Dependencies
- Vector Path Editing
- $$
- Documentation Data Model
- Playwright Test Setup
- Page Organize & Numbering
- Inline Text Editor
- Access Data & Chapters
- Electron Main Window
- Font Manager
- studio.js
- .build
- Desktop Security & Menu
- Regression Test Helpers
- Desktop Tests & Node APIs
- Signature Storage (IndexedDB)
- Draft & Template Store
- Auto-Updater
- Hit Testing & Geometry
- Auto-Release Workflow
- Signature Capture
- Signature Extraction
- Signature Tool
- PDF Font Encoding
- Stream Limits & Ligatures
- .model
- Page View
- NSIS Installer Config
- App
- download-stats.yml
- Interaction Tests
- File Access Grants
- Model Sanitizing
- toast
- Font Families
- Signature Drawing Pad
- SFNT Font Parsing
- High-Zoom Detail Renderer
- Security Tests
- showDialog
- OpenType Font Building
- wiring.js
- Brand & Rendering Docs
- Build Script
- interpretContent
- .resolveDown
- Text Layout Analysis
- Electron Builder Base
- download-stats.mjs
- Feature Docs
- CFF Font Parsing
- Window State
- Legacy 1.0 Editor
- newProject
- Zoom Gestures
- pdf-lib
- Zoom Tests
- Signature Tests
- Electron Fuses
- Security & Update Docs
- path-geometry.js
- Redesign Skill
- Font Licenses
- Windows Build Target
- Storage & Migration Docs
- site-tools.js
- EXIF Photo Dates
- Linux Build Target
- Project Identity
- Prettier Config
- Studio
- Extra Resources
- Session Start Hook
- Images & Snap Lines Docs
- Form Filling Docs
- Browser-like Navigation Docs
- FormLayer
- n
- parseFontName
- graphify-standalone.py

## God Nodes (most connected - your core abstractions)
1. `Studio` - 121 edges
2. `htmlToElement()` - 109 edges
3. `$$` - 91 edges
4. `EditMode` - 89 edges
5. `App` - 85 edges
6. `icon()` - 76 edges
7. `escapeHtml()` - 75 edges
8. `PdfSession` - 73 edges
9. `toast()` - 69 edges
10. `start()` - 56 edges

## Surprising Connections (you probably didn't know these)
- `Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail)` --semantically_similar_to--> `src/index.html HTML shell template`  [INFERRED] [semantically similar]
  legacy/PDF-Editor-1.0.html → src/index.html
- `PDF-Editor 1.0 (legacy single-file build)` --semantically_similar_to--> `dist/PDF-Editor.html (single-file build)`  [INFERRED] [semantically similar]
  legacy/PDF-Editor-1.0.html → README.md
- `Seiten organisieren / Seitenzahlen anpassen` --semantically_similar_to--> `Legacy organize-pages UI (insert, rotate, duplicate, delete, export)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `Text bearbeiten` --semantically_similar_to--> `Legacy inline text editor (te-frame)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `Bundled pdf.js (GlobalWorkerOptions, worker blob)` --implements--> `pdf.js`  [INFERRED]
  legacy/PDF-Editor-1.0.html → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Bundled OFL-licensed fonts** — assets_fonts_full_lizenz_barlow_barlow, assets_fonts_full_lizenz_ibm_plex_ibm_plex, assets_fonts_full_lizenz_barlow_sil_open_font_license, liesmich_fonts [EXTRACTED 1.00]
- **Single-file build compared against legacy in regression tests** — readme_build_pipeline, src_index, readme_dist_pdf_editor_html, readme_regression_tests, legacy_pdf_editor_1_0 [EXTRACTED 1.00]
- **Dokumentation workspace parts sharing device data** — liesmich_lageplan, liesmich_zugangsdaten, liesmich_fotodokumentation, liesmich_qr_codes, readme_studio [INFERRED 0.85]

## Communities (94 total, 19 thin omitted)

### Community 0 - "Inspector & Font Panels"
Cohesion: 0.09
Nodes (71): abortError(), COMMANDS, installDesktopBridge(), isDesktop, settle(), toBytes(), toHandle(), installTabStrip() (+63 more)

### Community 1 - "ui/recovery.js"
Cohesion: 0.15
Nodes (13): DesktopFileHandle, fileError(), reviveFileHandle(), db(), deleteCopy(), loadCopy(), orphanCopies(), putCopy() (+5 more)

### Community 2 - "Site Plan Geometry"
Cohesion: 0.10
Nodes (47): centroid(), dist(), fmt(), formatArea(), formatLength(), LEGEND_H, LEGEND_ROWS, metersPerPt() (+39 more)

### Community 4 - "PDF Form Fields"
Cohesion: 0.07
Nodes (50): appearanceColors(), appearanceFits(), applyFieldValue(), checkboxAppearances(), composeDA(), createField(), deleteField(), describeWidget() (+42 more)

### Community 5 - "Studio Rendering & Wiring"
Cohesion: 0.14
Nodes (24): BODY, isEmptySection(), overlaysOf(), COVER_LEFT, coverBody(), coverItems(), documentLabel(), fit() (+16 more)

### Community 6 - "app.js"
Cohesion: 0.07
Nodes (24): MODE_TOOLS, objectIds, readStripSetting(), readWorkspace(), ZOOM_LEVELS, ZOOM_PRESETS, DANGEROUS_ACTIONS, describeRemoved() (+16 more)

### Community 7 - "PDF Session Core"
Cohesion: 0.10
Nodes (4): restoreChanges(), pdfName(), PdfSession, repairStreamLengths()

### Community 8 - "Release Workflow"
Cohesion: 0.05
Nodes (48): concurrency, cancel-in-progress, group, run, CSC_IDENTITY_AUTO_DISCOVERY, REF_NAME, skip_regression, jobs (+40 more)

### Community 9 - "model.js"
Cohesion: 0.15
Nodes (21): appendToGroup(), BUS_KINDS, codeOffsets(), codeSep(), FADES, LANGS, NET_KINDS, numberedGroups() (+13 more)

### Community 10 - "content-stream.js"
Cohesion: 0.18
Nodes (11): bytesToHexString(), DELIMITERS, DictToken, formatNumber(), NameToken, parseContentStream(), serializeOp(), serializeOperand() (+3 more)

### Community 11 - "Manual Builder"
Cohesion: 0.16
Nodes (44): atomsCallout(), atomsCards(), atomsFigsteps(), atomsFigure(), atomsOf(), atomsSigns(), atomsTable(), base() (+36 more)

### Community 12 - "Package Dependencies"
Cohesion: 0.05
Nodes (44): author, name, dependencies, pako@1.0.11, pdf-lib@1.17.1, @pdf-lib/fontkit@1.1.1, pdfjs-dist@4.10.38, qrcode-generator@2.0.4 (+36 more)

### Community 13 - "Vector Path Editing"
Cohesion: 0.23
Nodes (3): cloneSubpaths(), pagePaths(), PathEditor

### Community 14 - "$$"
Cohesion: 0.15
Nodes (3): objectId(), notifyDocumentState(), $$

### Community 15 - "Documentation Data Model"
Cohesion: 0.13
Nodes (31): manualEdit, cleanAccess(), DEFAULT_CATEGORIES(), deviceHasData(), deviceOf(), newAccess(), newBlock(), newBox() (+23 more)

### Community 16 - "Playwright Test Setup"
Cohesion: 0.08
Nodes (7): @playwright/test, launch(), openPdf(), setup(), expectUnreadable(), labels(), openManual()

### Community 17 - "Page Organize & Numbering"
Cohesion: 0.17
Nodes (7): approxEqual(), copyRunningElements(), detectPageStructure(), formatPageNumber(), updatePageNumbers(), blockToEditLines(), OrganizeMode

### Community 18 - "Inline Text Editor"
Cohesion: 0.11
Nodes (8): LIGATURES, cssRgb(), isLetter(), isLowercase(), parseCssColor(), roundTo(), TextEditor, trackPointer()

### Community 19 - "Access Data & Chapters"
Cohesion: 0.14
Nodes (32): accessPages(), blockHasData(), cellLines(), hasSecrets(), valueText(), atomsPush(), chapterPages(), drawLines() (+24 more)

### Community 20 - "Electron Main Window"
Cohesion: 0.18
Nodes (34): frameColors(), start(), activateNear(), activateTab(), applyFrameColors(), autoCheck(), broadcastTabs(), closeTab() (+26 more)

### Community 21 - "Font Manager"
Cohesion: 0.11
Nodes (12): FontManager, hex4(), isBlankChar(), localFontSources(), nextFontFaceName(), randomSubsetTag(), STANDARD_FAMILIES, standardCanEncode() (+4 more)

### Community 22 - "studio.js"
Cohesion: 0.10
Nodes (26): assertPrintable(), canMakePdf(), contentFingerprint(), embedProject(), makePdf(), maker(), readProject(), TooLargeError (+18 more)

### Community 24 - "Desktop Security & Menu"
Cohesion: 0.11
Nodes (22): contentSecurityPolicy(), EDITOR_HTML, ICON, printErrorText(), ROOT, splitEditor(), hardenSession(), lastDirectory() (+14 more)

### Community 25 - "Regression Test Helpers"
Cohesion: 0.15
Nodes (18): waitForDocument(), canvasHashes(), clientPoint(), findBlock(), FIXTURE, idle(), inkHash(), LAYOUT (+10 more)

### Community 26 - "Desktop Tests & Node APIs"
Cohesion: 0.06
Nodes (16): FONT_DIR, line, lock, OUT_DIR, packages, parts, pkg, ROOT (+8 more)

### Community 27 - "Signature Storage (IndexedDB)"
Cohesion: 0.17
Nodes (24): addSignature(), deleteSignature(), emit(), getDefaultSignature(), getSignature(), listeners, listSignatures(), newId() (+16 more)

### Community 28 - "Draft & Template Store"
Cohesion: 0.26
Nodes (12): db(), deleteDraft(), deleteTemplate(), listDrafts(), listTemplates(), loadDraft(), loadTemplate(), req() (+4 more)

### Community 29 - "Auto-Updater"
Cohesion: 0.17
Nodes (20): installUpdate(), manualCheck(), allowedUrl(), DOWNLOAD_HOSTS, isNewer(), LATEST_URL, pickUpdate(), REPO (+12 more)

### Community 30 - "Hit Testing & Geometry"
Cohesion: 0.19
Nodes (15): isTranslationMatrix(), boxContains(), boxInside(), hexToRgb(), mmToPt(), ptToMm(), rgbToHex(), unionBoxes() (+7 more)

### Community 31 - "Auto-Release Workflow"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_TOKEN, jobs, tag, name, on (+14 more)

### Community 32 - "Signature Capture"
Cohesion: 0.13
Nodes (20): CAPTURE_DPI, decodeImageFile(), downscaleImage(), encodePng(), imageToCanvas(), MAX_PROCESS_PX, pickPageRegion(), renderPdfRegion() (+12 more)

### Community 33 - "Signature Extraction"
Cohesion: 0.19
Nodes (17): clamp01(), dilate(), estimateBackground(), extractSignature(), histPercentile(), luminanceOf(), otsuThreshold(), rankFilter() (+9 more)

### Community 35 - "PDF Font Encoding"
Cohesion: 0.18
Nodes (5): isSpaceCodePoint(), glyphNameToUnicode(), PdfFont, numberOf(), readStreamBytes()

### Community 37 - "Stream Limits & Ligatures"
Cohesion: 0.18
Nodes (19): applyClusters(), attachClusters(), clusterObjects(), assertDecodedSize(), checkDecodedSize(), checkFlate(), earlyChange(), filterNames() (+11 more)

### Community 38 - ".model"
Cohesion: 0.17
Nodes (4): bytesToLatin1(), ContentOp, latin1ToBytes(), newOp()

### Community 40 - "NSIS Installer Config"
Cohesion: 0.11
Nodes (19): nsis, allowElevation, allowToChangeInstallationDirectory, artifactName, createDesktopShortcut, createStartMenuShortcut, deleteAppDataOnUninstall, differentialPackage (+11 more)

### Community 41 - "App"
Cohesion: 0.19
Nodes (3): App, fileErrorReason(), downloadBytes()

### Community 42 - "download-stats.yml"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_TOKEN, GITHUB_TOKEN, jobs, record, name (+14 more)

### Community 43 - "Interaction Tests"
Cohesion: 0.15
Nodes (9): settled(), clickAt(), DIR, drag(), escape(), GRAFIK, pt(), pts() (+1 more)

### Community 44 - "File Access Grants"
Cohesion: 0.20
Nodes (8): FileAccess, FileAccessError, isPdfPath(), MESSAGES, pdfPathsFromArgv(), printRequestFromArgv(), renameWithRetry(), RETRY_CODES

### Community 45 - "Model Sanitizing"
Cohesion: 0.34
Nodes (14): clamp(), cleanChapters(), cleanLook(), cleanManualMeta(), cleanOverlays(), cleanPhotos(), cleanScale(), cleanSite() (+6 more)

### Community 46 - "toast"
Cohesion: 0.19
Nodes (6): overlayEdit, readImage(), pickFiles(), toast(), withBusy(), FontsPanel

### Community 47 - "Font Families"
Cohesion: 0.12
Nodes (3): FontFamily, fontKey(), FontLibrary

### Community 49 - "SFNT Font Parsing"
Cohesion: 0.24
Nodes (14): glyphIdSetCache, mappedGlyphIds(), parseSfnt(), readAdvanceWidths(), readCmaps(), readFontInfo(), readGlyphData(), readLeftSideBearings() (+6 more)

### Community 50 - "High-Zoom Detail Renderer"
Cohesion: 0.23
Nodes (6): area(), DETAIL_MAX_PX, DetailRenderer, grow(), intersect(), OVERSCAN

### Community 51 - "Security Tests"
Cohesion: 0.18
Nodes (11): extractText(), activePdf(), badWindowBomb(), bombPdf(), entries(), inspect(), modelAfterOpen(), N() (+3 more)

### Community 53 - "OpenType Font Building"
Cohesion: 0.45
Nodes (6): wrapCffAsOpenType(), addMissingTables(), buildCmapTable(), buildSfnt(), ByteWriter, mergeFontSubsets()

### Community 54 - "wiring.js"
Cohesion: 0.15
Nodes (23): diagramHits(), addSection(), fovSvg(), color(), badgeColor(), boxText(), busLabel(), catColor() (+15 more)

### Community 55 - "Brand & Rendering Docs"
Cohesion: 0.18
Nodes (12): plantpdf-app.svg App icon (graphite tile), Brand colors (Petrol, Orange, Flansch), PlantPDF Markenpaket (brand package), plantpdf-document.svg Document icon, Bundled pdf.js (GlobalWorkerOptions, worker blob), Zoomen bis 3200 % und Hand-Werkzeug, Build (scripts/build.mjs, esbuild IIFE), pdf.js (+4 more)

### Community 56 - "Build Script"
Cohesion: 0.21
Nodes (12): build(), buildWorkerSource(), fill(), FONT_DIR, ICON_DIR, loadBundledFonts(), loadLogos(), OUT_FILE (+4 more)

### Community 57 - "interpretContent"
Cohesion: 0.14
Nodes (13): interpretContent(), resolveColorSpace(), toRgb(), IDENTITY_MATRIX, invertMatrix(), multiplyMatrix(), toNumber(), transformPoint() (+5 more)

### Community 59 - "Text Layout Analysis"
Cohesion: 0.20
Nodes (10): PdfFontCache, buildTextBlocks(), buildTextLines(), finalizeBlock(), findNear(), hasJustifiedRightEdge(), isSpaceChar(), isUpright() (+2 more)

### Community 60 - "Electron Builder Base"
Cohesion: 0.17
Nodes (11): appId, artifactName, asar, copyright, directories, output, electronLanguages, files (+3 more)

### Community 61 - "download-stats.mjs"
Cohesion: 0.19
Nodes (15): BRANCH, countsFromReleases(), CSV_HEADER, csvField(), csvLine(), diffCounts(), fetchReleases(), fmt (+7 more)

### Community 62 - "Feature Docs"
Cohesion: 0.18
Nodes (10): Bundled pdf-lib + fontkit (PDFDocument, xref writer), ToUnicode CMap generation (Adobe-Identity-UCS), Fotodokumentation linked to Lageplan, Lageplan (site plan with devices, Richtfunk, Maßstab), Bild / QR-Code placement, Two workspaces: PDF and Dokumentation, Zugangsdaten (device credentials), PdfSession (session.js) (+2 more)

### Community 63 - "CFF Font Parsing"
Cohesion: 0.36
Nodes (9): buildCffDisplayFont(), glyphNameCandidates(), readCffCharset(), readCffDict(), readCffIndex(), readUint16(), readUintN(), GLYPH_TABLES (+1 more)

### Community 64 - "Window State"
Cohesion: 0.31
Nodes (9): bounds(), DEFAULT_SIZE, loadWindowState(), MIN_SIZE, rememberTheme(), stateFile(), THEMES, trackWindowState() (+1 more)

### Community 65 - "Legacy 1.0 Editor"
Cohesion: 0.24
Nodes (10): PDF-Editor 1.0 (legacy single-file build), Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail), Legacy CSS design tokens (:root --ink/--acc ...), Legacy start page (drop zone, features, recent), Legacy organize-pages UI (insert, rotate, duplicate, delete, export), Legacy inline text editor (te-frame), Seiten organisieren / Seitenzahlen anpassen, Text bearbeiten (+2 more)

### Community 66 - "newProject"
Cohesion: 0.25
Nodes (7): newGuard(), newManualMeta(), newProject(), pickParts(), applyCompany(), templatePreview(), templateProject()

### Community 68 - "pdf-lib"
Cohesion: 0.10
Nodes (7): pdf-lib, formPdf(), N(), savedBytes(), file(), PNG, openExample()

### Community 69 - "Zoom Tests"
Cohesion: 0.20
Nodes (4): BUILDS, objectsOf(), zoomIdle(), zoomOnto()

### Community 71 - "Electron Fuses"
Cohesion: 0.25
Nodes (8): electronFuses, enableCookieEncryption, enableEmbeddedAsarIntegrityValidation, enableNodeCliInspectArguments, enableNodeOptionsEnvironmentVariable, grantFileProtocolExtraPrivileges, onlyLoadAppFromAsar, runAsNode

### Community 72 - "Security & Update Docs"
Cohesion: 0.25
Nodes (4): Update-Suche über GitHub, Desktop-App (Electron), Release / Auto-Release GitHub workflows, Updater (GitHub releases, SHA-256 check)

### Community 73 - "path-geometry.js"
Cohesion: 0.12
Nodes (20): bezier(), deleteNodes(), deleteSegment(), detachSegment(), flattenSeg(), insideFill(), moveNodes(), nearestNode() (+12 more)

### Community 75 - "Font Licenses"
Cohesion: 0.38
Nodes (7): Barlow font (The Barlow Project Authors), Barlow Font License (SIL OFL 1.1), SIL Open Font License 1.1, IBM Plex font (Reserved Font Name Plex), IBM Plex Font License (SIL OFL 1.1), Bedienungsanleitung template (bilingual), Schriften (built-in Barlow, IBM Plex Mono, custom font loading)

### Community 76 - "Windows Build Target"
Cohesion: 0.29
Nodes (7): arch, target, win, icon, legalTrademarks, requestedExecutionLevel, target

### Community 77 - "Storage & Migration Docs"
Cohesion: 0.29
Nodes (6): IndexedDB pdf-editor v1, Automatische Wiederherstellung, Umstieg von Version 1.0 (storage migration), Unterschrift hinterlegen und einsetzen, IndexedDB stores (pdf-editor v2, pdfix-studio), Signature module (extract, capture, draw, store)

### Community 78 - "site-tools.js"
Cohesion: 0.18
Nodes (15): inPolygon(), pathDist(), segDist(), simplify(), toFrac(), newLink(), newShape(), newSymbol() (+7 more)

### Community 79 - "EXIF Photo Dates"
Cohesion: 0.60
Nodes (5): ascii(), entries(), exifDate(), photoDate(), toIso()

### Community 80 - "Linux Build Target"
Cohesion: 0.50
Nodes (4): linux, category, icon, target

### Community 81 - "Project Identity"
Cohesion: 0.67
Nodes (4): Former name PDFix (until 2.13), LIESMICH user manual (PlantPDF), Julius Steiner (Developer), PlantPDF

### Community 82 - "Prettier Config"
Cohesion: 0.50
Nodes (3): printWidth, singleQuote, trailingComma

### Community 83 - "Studio"
Cohesion: 0.05
Nodes (12): printHtml(), barlowCss(), css, ensureBarlow(), FACES, gunzip(), toBase64(), resetMeasure() (+4 more)

### Community 84 - "Extra Resources"
Cohesion: 0.67
Nodes (3): extraResources, from, to

### Community 91 - "n"
Cohesion: 0.50
Nodes (7): overlaySvg(), QR_CAPTION_H, qrCaption(), qrSvg(), qrText(), serialSources(), n()

## Ambiguous Edges - Review These
- `Automatische Wiederherstellung` → `IndexedDB stores (pdf-editor v2, pdfix-studio)`  [AMBIGUOUS]
  LIESMICH.txt · relation: shares_data_with

## Knowledge Gaps
- **18 isolated node(s):** `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)`, `ToUnicode CMap generation (Adobe-Identity-UCS)`, `Fotodokumentation linked to Lageplan` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 423 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pdf-lib` connect `pdf-lib` to `PDF Form Fields`, `Stream Limits & Ligatures`, `app.js`, `Signature Tests`, `Zoom Tests`, `Interaction Tests`, `Package Dependencies`, `SFNT Font Parsing`, `Page Organize & Numbering`, `Security Tests`, `Font Manager`, `studio.js`, `interpretContent`, `Desktop Tests & Node APIs`?**
  _High betweenness centrality (0.209) - this node is a cross-community bridge._
- **What connects `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Inspector & Font Panels` be split into smaller, more focused modules?**
  _Cohesion score 0.08740617180984153 - nodes in this community are weakly interconnected._
- **Why does `$$` connect `$$` to `Inspector & Font Panels`, `ui/recovery.js`, `Text Edit Mode`, `PDF Form Fields`, `app.js`, `Documentation Data Model`, `Page Organize & Numbering`, `studio.js`, `.build`, `Hit Testing & Geometry`, `Signature Capture`, `.onDown`, `App`, `toast`, `showDialog`, `.resolveDown`, `site-tools.js`, `Studio`, `.openBytes`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Should `Site Plan Geometry` be split into smaller, more focused modules?**
  _Cohesion score 0.09647058823529411 - nodes in this community are weakly interconnected._
- **Why does `Studio` connect `Studio` to `Inspector & Font Panels`, `newProject`, `Studio Rendering & Wiring`, `app.js`, `App`, `toast`, `Documentation Data Model`, `$$`, `showDialog`, `studio.js`, `.openBytes`, `Draft & Template Store`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Automatische Wiederherstellung` and `IndexedDB stores (pdf-editor v2, pdfix-studio)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._