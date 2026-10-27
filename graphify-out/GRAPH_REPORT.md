# Graph Report - PlantPDF  (2026-10-27)

## Corpus Check
- 159 files · ~269,961 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 32 file(s) not represented in the graph (top: .ttf 20, (none) 5, .css 3)

## Summary
- 2068 nodes · 6467 edges · 89 communities (68 shown, 21 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 223 edges (avg confidence: 0.85)
- Token cost: 133,466 input · 0 output

## Community Hubs (Navigation)
- Inspector & Font Panels
- Studio Workspace
- Site Plan Geometry
- Text Edit Mode
- PDF Form Fields
- Studio Rendering & Wiring
- App Shell & Desktop Bridge
- PDF Session Core
- Release Workflow
- Inspector Block Model
- Content Stream Parsing
- Manual Builder
- Package Dependencies
- Vector Path Editing
- App Lifecycle
- Documentation Data Model
- Playwright Test Setup
- Page Organize & Numbering
- Inline Text Editor
- Access Data & Chapters
- Electron Main Window
- Font Manager
- Studio PDF Export
- Page Navigation & Scrolling
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
- Form Designer
- Page View
- NSIS Installer Config
- Save, Print & Undo
- Crash Recovery Store
- Interaction Tests
- File Access Grants
- Model Sanitizing
- Manual Editing UI
- Font Families
- Signature Drawing Pad
- SFNT Font Parsing
- High-Zoom Detail Renderer
- Security Tests
- License Generation
- OpenType Font Building
- PDF Font Cache
- Brand & Rendering Docs
- Build Script
- Path Recording
- Selection Gestures
- Text Layout Analysis
- Electron Builder Base
- PDF Renderer & Print
- Feature Docs
- CFF Font Parsing
- Window State
- Legacy 1.0 Editor
- Image & QR Overlays
- Zoom Gestures
- Form Tests
- Zoom Tests
- Electron Fuses
- Security & Update Docs
- Snap Guides
- Redesign Skill
- Font Licenses
- Windows Build Target
- Storage & Migration Docs
- EXIF Photo Dates
- Linux Build Target
- Project Identity
- Prettier Config
- Drag Scheduling
- Extra Resources
- Session Start Hook
- Images & Snap Lines Docs
- Form Filling Docs
- Browser-like Navigation Docs

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
- `Text bearbeiten` --semantically_similar_to--> `Legacy inline text editor (te-frame)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `Seiten organisieren / Seitenzahlen anpassen` --semantically_similar_to--> `Legacy organize-pages UI (insert, rotate, duplicate, delete, export)`  [INFERRED] [semantically similar]
  LIESMICH.txt → legacy/PDF-Editor-1.0.html
- `Design Audit Checklist` --conceptually_related_to--> `Legacy CSS design tokens (:root --ink/--acc ...)`  [INFERRED]
  .claude/skills/redesign-skill/SKILL.md → legacy/PDF-Editor-1.0.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Single-file build compared against legacy in regression tests** — readme_build_pipeline, src_index, readme_dist_pdf_editor_html, readme_regression_tests, legacy_pdf_editor_1_0 [EXTRACTED 1.00]
- **Dokumentation workspace parts sharing device data** — liesmich_lageplan, liesmich_zugangsdaten, liesmich_fotodokumentation, liesmich_qr_codes, readme_studio [INFERRED 0.85]
- **Bundled OFL-licensed fonts** — assets_fonts_full_lizenz_barlow_barlow, assets_fonts_full_lizenz_ibm_plex_ibm_plex, assets_fonts_full_lizenz_barlow_sil_open_font_license, liesmich_fonts [EXTRACTED 1.00]

## Communities (89 total, 21 thin omitted)

### Community 0 - "Inspector & Font Panels"
Cohesion: 0.09
Nodes (56): FIELD_FONTS, installTabStrip(), render(), startDrag(), accessForm(), blockForm(), chaptersForm(), detailsGroup() (+48 more)

### Community 1 - "Studio Workspace"
Cohesion: 0.08
Nodes (4): toolOf(), inArea(), nextPinName(), Studio

### Community 2 - "Site Plan Geometry"
Cohesion: 0.08
Nodes (57): centroid(), dist(), fmt(), formatArea(), formatLength(), inPolygon(), LEGEND_H, LEGEND_ROWS (+49 more)

### Community 3 - "Text Edit Mode"
Cohesion: 0.10
Nodes (3): parseFontName(), EditMode, isTranslationMatrix()

### Community 4 - "PDF Form Fields"
Cohesion: 0.11
Nodes (43): appearanceColors(), appearanceFits(), applyFieldValue(), checkboxAppearances(), composeDA(), createField(), deleteField(), describeWidget() (+35 more)

### Community 5 - "Studio Rendering & Wiring"
Cohesion: 0.09
Nodes (51): BODY, isEmptySection(), projectName(), sectionTitle(), overlaysOf(), COVER_LEFT, coverBody(), coverItems() (+43 more)

### Community 6 - "App Shell & Desktop Bridge"
Cohesion: 0.06
Nodes (33): MODE_TOOLS, objectId(), objectIds, readStripSetting(), readWorkspace(), ZOOM_LEVELS, ZOOM_PRESETS, abortError() (+25 more)

### Community 8 - "Release Workflow"
Cohesion: 0.05
Nodes (48): concurrency, cancel-in-progress, group, run, CSC_IDENTITY_AUTO_DISCOVERY, REF_NAME, skip_regression, jobs (+40 more)

### Community 9 - "Inspector Block Model"
Cohesion: 0.08
Nodes (45): blockPreview(), catOf(), KIND_TITLE, linkTitle(), round1(), SERVICES, appendToGroup(), BLOCK_TYPES (+37 more)

### Community 10 - "Content Stream Parsing"
Cohesion: 0.09
Nodes (32): resolveColorSpace(), toRgb(), bytesToHexString(), bytesToLatin1(), ContentOp, DELIMITERS, DictToken, formatNumber() (+24 more)

### Community 11 - "Manual Builder"
Cohesion: 0.16
Nodes (45): atomsCallout(), atomsCards(), atomsFigsteps(), atomsFigure(), atomsOf(), atomsSigns(), atomsTable(), base() (+37 more)

### Community 12 - "Package Dependencies"
Cohesion: 0.05
Nodes (42): author, name, dependencies, pako@1.0.11, pdf-lib@1.17.1, @pdf-lib/fontkit@1.1.1, pdfjs-dist@4.10.38, qrcode-generator@2.0.4 (+34 more)

### Community 13 - "Vector Path Editing"
Cohesion: 0.13
Nodes (20): bezier(), cloneSubpaths(), deleteNodes(), deleteSegment(), detachSegment(), flattenSeg(), insideFill(), moveNodes() (+12 more)

### Community 15 - "Documentation Data Model"
Cohesion: 0.12
Nodes (38): cleanAccess(), DEFAULT_CATEGORIES(), DOC_PARTS, newAccess(), newBlock(), newBox(), newCard(), newChapters() (+30 more)

### Community 16 - "Playwright Test Setup"
Cohesion: 0.07
Nodes (8): @playwright/test, launch(), openPdf(), setup(), expectUnreadable(), labels(), openManual(), openExample()

### Community 17 - "Page Organize & Numbering"
Cohesion: 0.15
Nodes (10): approxEqual(), copyRunningElements(), detectPageStructure(), formatPageNumber(), updatePageNumbers(), blockToEditLines(), closeMenu(), showMenu() (+2 more)

### Community 18 - "Inline Text Editor"
Cohesion: 0.11
Nodes (7): cssRgb(), isLetter(), isLowercase(), parseCssColor(), roundTo(), TextEditor, trackPointer()

### Community 19 - "Access Data & Chapters"
Cohesion: 0.14
Nodes (31): accessPages(), blockHasData(), cellLines(), hasSecrets(), valueText(), atomsPush(), chapterLabels(), chapterPages() (+23 more)

### Community 20 - "Electron Main Window"
Cohesion: 0.18
Nodes (34): frameColors(), start(), activateNear(), activateTab(), applyFrameColors(), autoCheck(), broadcastTabs(), closeTab() (+26 more)

### Community 21 - "Font Manager"
Cohesion: 0.11
Nodes (13): @pdf-lib/fontkit, FontManager, hex4(), isBlankChar(), localFontSources(), nextFontFaceName(), randomSubsetTag(), STANDARD_FAMILIES (+5 more)

### Community 22 - "Studio PDF Export"
Cohesion: 0.11
Nodes (20): assertPrintable(), canMakePdf(), contentFingerprint(), embedProject(), makePdf(), maker(), printHtml(), readProject() (+12 more)

### Community 24 - "Desktop Security & Menu"
Cohesion: 0.11
Nodes (22): contentSecurityPolicy(), EDITOR_HTML, ICON, printErrorText(), ROOT, splitEditor(), hardenSession(), lastDirectory() (+14 more)

### Community 25 - "Regression Test Helpers"
Cohesion: 0.14
Nodes (20): waitForDocument(), canvasHashes(), clientPoint(), extractText(), findBlock(), FIXTURE, idle(), inkHash() (+12 more)

### Community 26 - "Desktop Tests & Node APIs"
Cohesion: 0.08
Nodes (8): DIR, GRAFIK, ELECTRON, ROOT, DIR, dokument(), makePng(), ROOT

### Community 27 - "Signature Storage (IndexedDB)"
Cohesion: 0.17
Nodes (24): addSignature(), deleteSignature(), emit(), getDefaultSignature(), getSignature(), listeners, listSignatures(), newId() (+16 more)

### Community 28 - "Draft & Template Store"
Cohesion: 0.14
Nodes (15): pruneImages(), documentLabel(), db(), deleteDraft(), deleteTemplate(), listDrafts(), listTemplates(), loadDraft() (+7 more)

### Community 29 - "Auto-Updater"
Cohesion: 0.17
Nodes (20): installUpdate(), manualCheck(), allowedUrl(), DOWNLOAD_HOSTS, isNewer(), LATEST_URL, pickUpdate(), REPO (+12 more)

### Community 30 - "Hit Testing & Geometry"
Cohesion: 0.18
Nodes (15): subpathsBox(), boxContains(), boxInside(), hexToRgb(), mmToPt(), ptToMm(), rgbToHex(), unionBoxes() (+7 more)

### Community 31 - "Auto-Release Workflow"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_TOKEN, jobs, tag, name, on (+14 more)

### Community 32 - "Signature Capture"
Cohesion: 0.15
Nodes (17): CAPTURE_DPI, decodeImageFile(), downscaleImage(), encodePng(), imageToCanvas(), MAX_PROCESS_PX, pickPageRegion(), renderPdfRegion() (+9 more)

### Community 33 - "Signature Extraction"
Cohesion: 0.16
Nodes (19): clamp01(), cropToAlpha(), dilate(), estimateBackground(), extractSignature(), histPercentile(), INK_COLORS, luminanceOf() (+11 more)

### Community 35 - "PDF Font Encoding"
Cohesion: 0.18
Nodes (5): isSpaceCodePoint(), glyphNameToUnicode(), PdfFont, numberOf(), readStreamBytes()

### Community 37 - "Stream Limits & Ligatures"
Cohesion: 0.20
Nodes (17): pdf-lib, LIGATURES, assertDecodedSize(), checkDecodedSize(), checkFlate(), earlyChange(), filterNames(), lzwDecodedLength() (+9 more)

### Community 40 - "NSIS Installer Config"
Cohesion: 0.11
Nodes (19): nsis, allowElevation, allowToChangeInstallationDirectory, artifactName, createDesktopShortcut, createStartMenuShortcut, deleteAppDataOnUninstall, differentialPackage (+11 more)

### Community 41 - "Save, Print & Undo"
Cohesion: 0.16
Nodes (8): DANGEROUS_ACTIONS, describeRemoved(), hasRemoved(), N(), REMOVED_ANNOTATIONS, withoutActiveContent(), fileErrorReason(), downloadBytes()

### Community 42 - "Crash Recovery Store"
Cohesion: 0.28
Nodes (10): db(), deleteCopy(), loadCopy(), orphanCopies(), putCopy(), req(), run(), windowId (+2 more)

### Community 43 - "Interaction Tests"
Cohesion: 0.15
Nodes (9): settled(), clickAt(), DIR, drag(), escape(), GRAFIK, pt(), pts() (+1 more)

### Community 44 - "File Access Grants"
Cohesion: 0.20
Nodes (8): FileAccess, FileAccessError, isPdfPath(), MESSAGES, pdfPathsFromArgv(), printRequestFromArgv(), renameWithRetry(), RETRY_CODES

### Community 45 - "Model Sanitizing"
Cohesion: 0.23
Nodes (15): hasProject(), clamp(), cleanChapters(), cleanLook(), cleanManualMeta(), cleanOverlays(), cleanPhotos(), cleanScale() (+7 more)

### Community 46 - "Manual Editing UI"
Cohesion: 0.26
Nodes (5): manualEdit, readImage(), pickFiles(), toast(), withBusy()

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
Cohesion: 0.19
Nodes (10): activePdf(), badWindowBomb(), bombPdf(), entries(), inspect(), modelAfterOpen(), N(), pdfWithContent() (+2 more)

### Community 52 - "License Generation"
Cohesion: 0.13
Nodes (10): FONT_DIR, line, lock, OUT_DIR, packages, parts, pkg, ROOT (+2 more)

### Community 53 - "OpenType Font Building"
Cohesion: 0.45
Nodes (6): wrapCffAsOpenType(), addMissingTables(), buildCmapTable(), buildSfnt(), ByteWriter, mergeFontSubsets()

### Community 54 - "PDF Font Cache"
Cohesion: 0.21
Nodes (3): PdfFontCache, pdfName(), repairStreamLengths()

### Community 55 - "Brand & Rendering Docs"
Cohesion: 0.18
Nodes (12): plantpdf-app.svg App icon (graphite tile), Brand colors (Petrol, Orange, Flansch), PlantPDF Markenpaket (brand package), plantpdf-document.svg Document icon, Bundled pdf.js (GlobalWorkerOptions, worker blob), Zoomen bis 3200 % und Hand-Werkzeug, Build (scripts/build.mjs, esbuild IIFE), pdf.js (+4 more)

### Community 56 - "Build Script"
Cohesion: 0.23
Nodes (12): build(), buildWorkerSource(), fill(), FONT_DIR, ICON_DIR, loadBundledFonts(), loadLogos(), OUT_FILE (+4 more)

### Community 59 - "Text Layout Analysis"
Cohesion: 0.26
Nodes (10): PageTooComplexError, buildTextBlocks(), buildTextLines(), finalizeBlock(), findNear(), hasJustifiedRightEdge(), isSpaceChar(), isUpright() (+2 more)

### Community 60 - "Electron Builder Base"
Cohesion: 0.17
Nodes (11): appId, artifactName, asar, copyright, directories, output, electronLanguages, files (+3 more)

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

### Community 66 - "Image & QR Overlays"
Cohesion: 0.36
Nodes (8): overlayEdit, overlaySvg(), QR_CAPTION_H, qrCaption(), qrSvg(), qrText(), serialSources(), C

### Community 68 - "Form Tests"
Cohesion: 0.22
Nodes (3): formPdf(), N(), savedBytes()

### Community 69 - "Zoom Tests"
Cohesion: 0.22
Nodes (3): BUILDS, zoomIdle(), zoomOnto()

### Community 71 - "Electron Fuses"
Cohesion: 0.25
Nodes (8): electronFuses, enableCookieEncryption, enableEmbeddedAsarIntegrityValidation, enableNodeCliInspectArguments, enableNodeOptionsEnvironmentVariable, grantFileProtocolExtraPrivileges, onlyLoadAppFromAsar, runAsNode

### Community 72 - "Security & Update Docs"
Cohesion: 0.25
Nodes (4): Update-Suche über GitHub, Desktop-App (Electron), Release / Auto-Release GitHub workflows, Updater (GitHub releases, SHA-256 check)

### Community 75 - "Font Licenses"
Cohesion: 0.38
Nodes (7): Barlow font (The Barlow Project Authors), Barlow Font License (SIL OFL 1.1), SIL Open Font License 1.1, IBM Plex font (Reserved Font Name Plex), IBM Plex Font License (SIL OFL 1.1), Bedienungsanleitung template (bilingual), Schriften (built-in Barlow, IBM Plex Mono, custom font loading)

### Community 76 - "Windows Build Target"
Cohesion: 0.29
Nodes (7): arch, target, win, icon, legalTrademarks, requestedExecutionLevel, target

### Community 77 - "Storage & Migration Docs"
Cohesion: 0.29
Nodes (6): IndexedDB pdf-editor v1, Automatische Wiederherstellung, Umstieg von Version 1.0 (storage migration), Unterschrift hinterlegen und einsetzen, IndexedDB stores (pdf-editor v2, pdfix-studio), Signature module (extract, capture, draw, store)

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

### Community 84 - "Extra Resources"
Cohesion: 0.67
Nodes (3): extraResources, from, to

## Ambiguous Edges - Review These
- `IndexedDB stores (pdf-editor v2, pdfix-studio)` → `Automatische Wiederherstellung`  [AMBIGUOUS]
  LIESMICH.txt · relation: shares_data_with

## Knowledge Gaps
- **18 isolated node(s):** `Schnelldruck (silent print via ProgID verbs)`, `Release / Auto-Release GitHub workflows`, `PdfSession (session.js)`, `Browser-like document tabs`, `Formularfelder ausfüllen und anlegen` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 399 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pdf-lib` connect `Stream Limits & Ligatures` to `PDF Form Fields`, `Form Tests`, `App Shell & Desktop Bridge`, `Signature Tests`, `Zoom Tests`, `Save, Print & Undo`, `Content Stream Parsing`, `Interaction Tests`, `Package Dependencies`, `Documentation Data Model`, `Playwright Test Setup`, `SFNT Font Parsing`, `Page Organize & Numbering`, `Security Tests`, `License Generation`, `Font Manager`, `Studio PDF Export`, `Desktop Tests & Node APIs`?**
  _High betweenness centrality (0.229) - this node is a cross-community bridge._
- **What connects `Schnelldruck (silent print via ProgID verbs)`, `Release / Auto-Release GitHub workflows`, `PdfSession (session.js)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Inspector & Font Panels` be split into smaller, more focused modules?**
  _Cohesion score 0.08851485148514851 - nodes in this community are weakly interconnected._
- **Why does `$$` connect `Page Navigation & Scrolling` to `Inspector & Font Panels`, `Studio Workspace`, `Image & QR Overlays`, `Site Plan Geometry`, `Text Edit Mode`, `Edit Mode Interaction`, `App Shell & Desktop Bridge`, `Form Designer`, `Signature Capture`, `Save, Print & Undo`, `Inspector Block Model`, `Crash Recovery Store`, `App Lifecycle`, `Manual Editing UI`, `Documentation Data Model`, `Page Organize & Numbering`, `Draft & Template Store`, `Hit Testing & Geometry`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Should `Studio Workspace` be split into smaller, more focused modules?**
  _Cohesion score 0.07753164556962025 - nodes in this community are weakly interconnected._
- **Why does `htmlToElement()` connect `Inspector & Font Panels` to `Signature Capture`, `Studio Workspace`, `Site Plan Geometry`, `Text Edit Mode`, `Signature Tool`, `App Shell & Desktop Bridge`, `Form Designer`, `Inspector Block Model`, `App Lifecycle`, `Documentation Data Model`, `Manual Editing UI`, `Page Organize & Numbering`, `Signature Drawing Pad`, `Page Navigation & Scrolling`, `Signature Storage (IndexedDB)`, `Draft & Template Store`, `Hit Testing & Geometry`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `IndexedDB stores (pdf-editor v2, pdfix-studio)` and `Automatische Wiederherstellung`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._