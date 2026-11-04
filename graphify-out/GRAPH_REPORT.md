# Graph Report - PlantPDF  (2026-11-04)

## Corpus Check
- 132 files · ~278,632 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 32 file(s) not represented in the graph (top: .ttf 20, (none) 5, .css 3)

## Summary
- 2144 nodes · 6705 edges · 89 communities (67 shown, 22 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 225 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `42bd4991`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Inspector & Font Panels
- ui/recovery.js
- Site Plan Geometry
- EditMode
- PDF Form Fields
- render.js
- desktop-bridge.js
- model.js
- Release Workflow
- numberedGroups
- cff.js
- Manual Builder
- package.json
- SnapGuides
- .onKey
- app.js
- Playwright Test Setup
- Page Organize & Numbering
- Inline Text Editor
- access.js
- Electron Main Window
- font-manager.js
- FormDesign
- PdfFont
- Desktop Security & Menu
- Regression Test Helpers
- Desktop Tests & Node APIs
- Signature Storage (IndexedDB)
- studio.js
- Auto-Updater
- edit-mode.js
- Auto-Release Workflow
- signature-extract.js
- App
- licenses.mjs
- .onDown
- Stream Limits & Ligatures
- PathEditor
- Page View
- NSIS Installer Config
- devDependencies
- Interaction Tests
- File Access Grants
- signature-panel.js
- scripts
- SignatureTool
- SignaturePad
- e2e
- High-Zoom Detail Renderer
- Security Tests
- dependencies
- notifyDocumentState
- wiring.js
- Brand & Rendering Docs
- Build Script
- Path Recording
- .drawSelection
- Text Layout Analysis
- Electron Builder Base
- PDF Renderer & Print
- Feature Docs
- active-content.js
- Window State
- Legacy 1.0 Editor
- export.js
- Zoom Gestures
- pdf-lib
- Zoom Tests
- overlays.js
- Electron Fuses
- Security & Update Docs
- parseFontName
- Redesign Skill
- Font Licenses
- Windows Build Target
- Storage & Migration Docs
- EXIF Photo Dates
- Linux Build Target
- Prettier Config
- Studio
- Extra Resources
- Session Start Hook
- Images & Snap Lines Docs
- Form Filling Docs
- Browser-like Navigation Docs
- graphify-standalone.py
- PdfSession

## God Nodes (most connected - your core abstractions)
1. `Studio` - 129 edges
2. `htmlToElement()` - 112 edges
3. `$$` - 94 edges
4. `EditMode` - 89 edges
5. `App` - 88 edges
6. `escapeHtml()` - 83 edges
7. `icon()` - 76 edges
8. `PdfSession` - 73 edges
9. `toast()` - 72 edges
10. `start()` - 60 edges

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
- 2-file cycle: `src/studio/manual-edit.js -> src/studio/studio.js -> src/studio/manual-edit.js`
- 2-file cycle: `src/studio/overlay-edit.js -> src/studio/studio.js -> src/studio/overlay-edit.js`

## Hyperedges (group relationships)
- **Bundled OFL-licensed fonts** — assets_fonts_full_lizenz_barlow_barlow, assets_fonts_full_lizenz_ibm_plex_ibm_plex, assets_fonts_full_lizenz_barlow_sil_open_font_license, liesmich_fonts [EXTRACTED 1.00]
- **Single-file build compared against legacy in regression tests** — readme_build_pipeline, src_index, readme_dist_pdf_editor_html, readme_regression_tests, legacy_pdf_editor_1_0 [EXTRACTED 1.00]
- **Dokumentation workspace parts sharing device data** — liesmich_lageplan, liesmich_zugangsdaten, liesmich_fotodokumentation, liesmich_qr_codes, readme_studio [INFERRED 0.85]

## Communities (89 total, 22 thin omitted)

### Community 0 - "Inspector & Font Panels"
Cohesion: 0.08
Nodes (72): installTabStrip(), render(), startDrag(), installTitleBar(), chapterLabels(), referenceTargets(), accessForm(), blockForm() (+64 more)

### Community 1 - "ui/recovery.js"
Cohesion: 0.26
Nodes (11): db(), deleteCopy(), liveWindows(), loadCopy(), orphanCopies(), putCopy(), req(), run() (+3 more)

### Community 2 - "Site Plan Geometry"
Cohesion: 0.08
Nodes (57): centroid(), dist(), fmt(), formatArea(), formatLength(), inPolygon(), LEGEND_H, LEGEND_ROWS (+49 more)

### Community 4 - "PDF Form Fields"
Cohesion: 0.08
Nodes (52): appearanceColors(), appearanceFits(), applyFieldValue(), checkboxAppearances(), composeDA(), createField(), deleteField(), describeWidget() (+44 more)

### Community 5 - "render.js"
Cohesion: 0.11
Nodes (46): atomsPush(), chapterPages(), drawLines(), figureAtom(), resolveCell(), tableAtoms(), BODY, manualPages() (+38 more)

### Community 6 - "desktop-bridge.js"
Cohesion: 0.09
Nodes (20): abortError(), COMMANDS, DesktopFileHandle, fileError(), installDesktopBridge(), isDesktop, reviveFileHandle(), settle() (+12 more)

### Community 7 - "model.js"
Cohesion: 0.07
Nodes (69): BLOCK_TYPES, BUS_KINDS, clamp(), cleanAccess(), cleanChapters(), cleanLook(), cleanManualMeta(), cleanOverlays() (+61 more)

### Community 8 - "Release Workflow"
Cohesion: 0.05
Nodes (48): concurrency, cancel-in-progress, group, run, CSC_IDENTITY_AUTO_DISCOVERY, REF_NAME, skip_regression, jobs (+40 more)

### Community 9 - "numberedGroups"
Cohesion: 0.39
Nodes (8): appendToGroup(), codeOffsets(), codeSep(), numberedGroups(), renumberByPosition(), setSymbolNumber(), symbolCode(), symbolNumber()

### Community 10 - "cff.js"
Cohesion: 0.22
Nodes (15): buildCffDisplayFont(), glyphNameCandidates(), readCffCharset(), readCffDict(), readCffIndex(), readUint16(), readUintN(), wrapCffAsOpenType() (+7 more)

### Community 11 - "Manual Builder"
Cohesion: 0.18
Nodes (42): atomsCallout(), atomsCards(), atomsFigsteps(), atomsFigure(), atomsOf(), atomsSigns(), atomsTable(), base() (+34 more)

### Community 12 - "package.json"
Cohesion: 0.15
Nodes (12): author, name, description, engines, node, license, main, name (+4 more)

### Community 15 - "app.js"
Cohesion: 0.11
Nodes (21): MODE_TOOLS, objectId(), objectIds, readStripSetting(), readWorkspace(), ZOOM_LEVELS, ZOOM_PRESETS, keepTopBarFitting() (+13 more)

### Community 16 - "Playwright Test Setup"
Cohesion: 0.06
Nodes (10): @playwright/test, launch(), openPdf(), runBoth(), setup(), expectUnreadable(), labels(), openManual() (+2 more)

### Community 17 - "Page Organize & Numbering"
Cohesion: 0.17
Nodes (7): approxEqual(), copyRunningElements(), detectPageStructure(), formatPageNumber(), updatePageNumbers(), blockToEditLines(), OrganizeMode

### Community 18 - "Inline Text Editor"
Cohesion: 0.09
Nodes (7): cssRgb(), isLetter(), isLowercase(), parseCssColor(), roundTo(), TextEditor, trackPointer()

### Community 19 - "access.js"
Cohesion: 0.24
Nodes (13): accessPages(), blockHasData(), cellLines(), hasSecrets(), valueText(), cache, context(), ctxs (+5 more)

### Community 20 - "Electron Main Window"
Cohesion: 0.18
Nodes (36): frameColors(), start(), activateNear(), activateTab(), applyFrameColors(), broadcastTabs(), closeTab(), command() (+28 more)

### Community 21 - "font-manager.js"
Cohesion: 0.06
Nodes (18): @pdf-lib/fontkit, FontFamily, fontKey(), FontLibrary, FontManager, hex4(), isBlankChar(), nextFontFaceName() (+10 more)

### Community 23 - "PdfFont"
Cohesion: 0.10
Nodes (22): glyphIdSetCache, isSpaceCodePoint(), mappedGlyphIds(), parseSfnt(), readAdvanceWidths(), readCmaps(), readFontInfo(), readGlyphData() (+14 more)

### Community 24 - "Desktop Security & Menu"
Cohesion: 0.11
Nodes (22): contentSecurityPolicy(), EDITOR_HTML, ICON, printErrorText(), ROOT, splitEditor(), hardenSession(), lastDirectory() (+14 more)

### Community 25 - "Regression Test Helpers"
Cohesion: 0.17
Nodes (15): canvasHashes(), clientPoint(), findBlock(), FIXTURE, idle(), inkHash(), LAYOUT, ROOT (+7 more)

### Community 26 - "Desktop Tests & Node APIs"
Cohesion: 0.06
Nodes (16): DIST, PORT, TYPES, child, cli, ROOT, DIR, GRAFIK (+8 more)

### Community 27 - "Signature Storage (IndexedDB)"
Cohesion: 0.17
Nodes (24): addSignature(), deleteSignature(), emit(), getDefaultSignature(), getSignature(), listeners, listSignatures(), newId() (+16 more)

### Community 28 - "studio.js"
Cohesion: 0.09
Nodes (40): manualEdit, FONTS, overlayEdit, documentLabel(), siteTools, AUTO, autoMeta(), db() (+32 more)

### Community 29 - "Auto-Updater"
Cohesion: 0.16
Nodes (22): autoCheck(), installUpdate(), manualCheck(), allowedUrl(), DOWNLOAD_HOSTS, isNewer(), LATEST_URL, pickUpdate() (+14 more)

### Community 30 - "edit-mode.js"
Cohesion: 0.25
Nodes (10): subpathsBox(), isTranslationMatrix(), boxContains(), boxInside(), hexToRgb(), mmToPt(), ptToMm(), rgbToHex() (+2 more)

### Community 31 - "Auto-Release Workflow"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_TOKEN, jobs, tag, name, on (+14 more)

### Community 33 - "signature-extract.js"
Cohesion: 0.16
Nodes (19): clamp01(), cropToAlpha(), dilate(), estimateBackground(), extractSignature(), histPercentile(), INK_COLORS, luminanceOf() (+11 more)

### Community 35 - "licenses.mjs"
Cohesion: 0.13
Nodes (10): FONT_DIR, line, lock, OUT_DIR, packages, parts, pkg, ROOT (+2 more)

### Community 36 - ".onDown"
Cohesion: 0.23
Nodes (3): objectHits(), pickObject(), pxPerPt()

### Community 37 - "Stream Limits & Ligatures"
Cohesion: 0.21
Nodes (16): LIGATURES, assertDecodedSize(), checkDecodedSize(), checkFlate(), earlyChange(), filterNames(), lzwDecodedLength(), MAX_CONTENT_BYTES (+8 more)

### Community 38 - "PathEditor"
Cohesion: 0.11
Nodes (25): bezier(), cloneSubpaths(), deleteNodes(), deleteSegment(), detachSegment(), flattenSeg(), insideFill(), moveNodes() (+17 more)

### Community 40 - "NSIS Installer Config"
Cohesion: 0.11
Nodes (19): nsis, allowElevation, allowToChangeInstallationDirectory, artifactName, createDesktopShortcut, createStartMenuShortcut, deleteAppDataOnUninstall, differentialPackage (+11 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @agentclientprotocol/claude-agent-acp@0.100.0, @e2e-dev/acp@0.1.0, electron@44.5.1, electron-builder@26.15.3, esbuild@0.28.2, @playwright/test@1.56.1, prettier@3.9.9 (+5 more)

### Community 43 - "Interaction Tests"
Cohesion: 0.14
Nodes (10): settled(), clickAt(), DIR, drag(), escape(), GRAFIK, pt(), pts() (+2 more)

### Community 44 - "File Access Grants"
Cohesion: 0.20
Nodes (8): FileAccess, FileAccessError, isPdfPath(), MESSAGES, pdfPathsFromArgv(), printRequestFromArgv(), renameWithRetry(), RETRY_CODES

### Community 45 - "signature-panel.js"
Cohesion: 0.15
Nodes (17): CAPTURE_DPI, decodeImageFile(), downscaleImage(), encodePng(), imageToCanvas(), MAX_PROCESS_PX, pickPageRegion(), renderPdfRegion() (+9 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, app, build, build:desktop, dev, dist:linux, dist:win, fixtures (+5 more)

### Community 49 - "e2e"
Cohesion: 0.27
Nodes (6): serve, DOKUMENT_PDF_B64, e2e@0.22.0, @e2e-dev/web@0.15.4, e2e, @e2e-dev/web

### Community 50 - "High-Zoom Detail Renderer"
Cohesion: 0.18
Nodes (6): area(), DETAIL_MAX_PX, DetailRenderer, grow(), intersect(), OVERSCAN

### Community 51 - "Security Tests"
Cohesion: 0.17
Nodes (11): extractText(), activePdf(), badWindowBomb(), bombPdf(), entries(), inspect(), modelAfterOpen(), N() (+3 more)

### Community 52 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, pako@1.0.11, pdf-lib@1.17.1, @pdf-lib/fontkit@1.1.1, pdfjs-dist@4.10.38, qrcode-generator@2.0.4, pako, pdfjs-dist (+1 more)

### Community 54 - "wiring.js"
Cohesion: 0.18
Nodes (18): badgeColor(), boxText(), busLabel(), catColor(), colRight(), COLS, DIAGRAM, DIAGRAM_LANDSCAPE (+10 more)

### Community 55 - "Brand & Rendering Docs"
Cohesion: 0.18
Nodes (12): plantpdf-app.svg App icon (graphite tile), Brand colors (Petrol, Orange, Flansch), PlantPDF Markenpaket (brand package), plantpdf-document.svg Document icon, Bundled pdf.js (GlobalWorkerOptions, worker blob), Zoomen bis 3200 % und Hand-Werkzeug, Build (scripts/build.mjs, esbuild IIFE), pdf.js (+4 more)

### Community 56 - "Build Script"
Cohesion: 0.23
Nodes (12): build(), buildWorkerSource(), fill(), FONT_DIR, ICON_DIR, loadBundledFonts(), loadLogos(), OUT_FILE (+4 more)

### Community 57 - "Path Recording"
Cohesion: 0.09
Nodes (28): interpretContent(), resolveColorSpace(), toRgb(), bytesToHexString(), bytesToLatin1(), ContentOp, DELIMITERS, DictToken (+20 more)

### Community 59 - "Text Layout Analysis"
Cohesion: 0.26
Nodes (10): PageTooComplexError, buildTextBlocks(), buildTextLines(), finalizeBlock(), findNear(), hasJustifiedRightEdge(), isSpaceChar(), isUpright() (+2 more)

### Community 60 - "Electron Builder Base"
Cohesion: 0.17
Nodes (11): appId, artifactName, asar, copyright, directories, output, electronLanguages, files (+3 more)

### Community 62 - "Feature Docs"
Cohesion: 0.18
Nodes (10): Bundled pdf-lib + fontkit (PDFDocument, xref writer), ToUnicode CMap generation (Adobe-Identity-UCS), Fotodokumentation linked to Lageplan, Lageplan (site plan with devices, Richtfunk, Maßstab), Bild / QR-Code placement, Two workspaces: PDF and Dokumentation, Zugangsdaten (device credentials), PdfSession (session.js) (+2 more)

### Community 63 - "active-content.js"
Cohesion: 0.33
Nodes (6): DANGEROUS_ACTIONS, describeRemoved(), hasRemoved(), N(), REMOVED_ANNOTATIONS, withoutActiveContent()

### Community 64 - "Window State"
Cohesion: 0.31
Nodes (9): bounds(), DEFAULT_SIZE, loadWindowState(), MIN_SIZE, rememberTheme(), stateFile(), THEMES, trackWindowState() (+1 more)

### Community 65 - "Legacy 1.0 Editor"
Cohesion: 0.22
Nodes (11): PDF-Editor 1.0 (legacy single-file build), Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail), Legacy CSS design tokens (:root --ink/--acc ...), Legacy start page (drop zone, features, recent), IndexedDB pdf-editor v1, Legacy organize-pages UI (insert, rotate, duplicate, delete, export), Legacy inline text editor (te-frame), Seiten organisieren / Seitenzahlen anpassen (+3 more)

### Community 66 - "export.js"
Cohesion: 0.13
Nodes (17): assertPrintable(), contentFingerprint(), embedProject(), hasProject(), makePdf(), maker(), readProject(), TooLargeError (+9 more)

### Community 68 - "pdf-lib"
Cohesion: 0.11
Nodes (4): pdf-lib, formPdf(), N(), savedBytes()

### Community 69 - "Zoom Tests"
Cohesion: 0.20
Nodes (4): BUILDS, objectsOf(), zoomIdle(), zoomOnto()

### Community 70 - "overlays.js"
Cohesion: 0.52
Nodes (6): overlaySvg(), QR_CAPTION_H, qrCaption(), qrSvg(), qrText(), serialSources()

### Community 71 - "Electron Fuses"
Cohesion: 0.25
Nodes (8): electronFuses, enableCookieEncryption, enableEmbeddedAsarIntegrityValidation, enableNodeCliInspectArguments, enableNodeOptionsEnvironmentVariable, grantFileProtocolExtraPrivileges, onlyLoadAppFromAsar, runAsNode

### Community 72 - "Security & Update Docs"
Cohesion: 0.18
Nodes (8): Former name PDFix (until 2.13), Update-Suche über GitHub, LIESMICH user manual (PlantPDF), Desktop-App (Electron), Julius Steiner (Developer), PlantPDF, Release / Auto-Release GitHub workflows, Updater (GitHub releases, SHA-256 check)

### Community 75 - "Font Licenses"
Cohesion: 0.38
Nodes (7): Barlow font (The Barlow Project Authors), Barlow Font License (SIL OFL 1.1), SIL Open Font License 1.1, IBM Plex font (Reserved Font Name Plex), IBM Plex Font License (SIL OFL 1.1), Bedienungsanleitung template (bilingual), Schriften (built-in Barlow, IBM Plex Mono, custom font loading)

### Community 76 - "Windows Build Target"
Cohesion: 0.29
Nodes (7): arch, target, win, icon, legalTrademarks, requestedExecutionLevel, target

### Community 77 - "Storage & Migration Docs"
Cohesion: 0.33
Nodes (5): Automatische Wiederherstellung, Umstieg von Version 1.0 (storage migration), Unterschrift hinterlegen und einsetzen, IndexedDB stores (pdf-editor v2, pdfix-studio), Signature module (extract, capture, draw, store)

### Community 79 - "EXIF Photo Dates"
Cohesion: 0.60
Nodes (5): ascii(), entries(), exifDate(), photoDate(), toIso()

### Community 80 - "Linux Build Target"
Cohesion: 0.50
Nodes (4): linux, category, icon, target

### Community 82 - "Prettier Config"
Cohesion: 0.50
Nodes (3): printWidth, singleQuote, trailingComma

### Community 83 - "Studio"
Cohesion: 0.05
Nodes (9): canMakePdf(), printHtml(), withoutSecrets(), toolOf(), failMessage(), inArea(), rememberCompany(), Studio (+1 more)

### Community 84 - "Extra Resources"
Cohesion: 0.67
Nodes (3): extraResources, from, to

## Ambiguous Edges - Review These
- `Automatische Wiederherstellung` → `IndexedDB stores (pdf-editor v2, pdfix-studio)`  [AMBIGUOUS]
  LIESMICH.txt · relation: shares_data_with

## Knowledge Gaps
- **18 isolated node(s):** `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)`, `ToUnicode CMap generation (Adobe-Identity-UCS)`, `Fotodokumentation linked to Lageplan` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 417 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pdf-lib` connect `pdf-lib` to `export.js`, `licenses.mjs`, `PDF Form Fields`, `Stream Limits & Ligatures`, `Zoom Tests`, `Interaction Tests`, `package.json`, `app.js`, `Playwright Test Setup`, `Security Tests`, `dependencies`, `font-manager.js`, `PdfFont`, `Path Recording`, `Desktop Tests & Node APIs`, `studio.js`, `active-content.js`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **What connects `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Inspector & Font Panels` be split into smaller, more focused modules?**
  _Cohesion score 0.08314263920671243 - nodes in this community are weakly interconnected._
- **Why does `$$` connect `FormDesign` to `.openBytes`, `Inspector & Font Panels`, `App`, `Site Plan Geometry`, `EditMode`, `.onDown`, `PDF Form Fields`, `ui/recovery.js`, `.build`, `signature-panel.js`, `.onKey`, `app.js`, `Page Organize & Numbering`, `High-Zoom Detail Renderer`, `Studio`, `notifyDocumentState`, `studio.js`, `edit-mode.js`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Should `Site Plan Geometry` be split into smaller, more focused modules?**
  _Cohesion score 0.08397337429595494 - nodes in this community are weakly interconnected._
- **Why does `EditMode` connect `EditMode` to `Inspector & Font Panels`, `App`, `.onDown`, `PathEditor`, `parseFontName`, `.build`, `.onKey`, `app.js`, `Inline Text Editor`, `.drawSelection`, `edit-mode.js`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Automatische Wiederherstellung` and `IndexedDB stores (pdf-editor v2, pdfix-studio)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._