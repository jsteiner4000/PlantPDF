# Graph Report - PlantPDF  (2026-11-06)

## Corpus Check
- 135 files · ~285,374 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 32 file(s) not represented in the graph (top: .ttf 20, (none) 5, .css 3)

## Summary
- 2206 nodes · 6959 edges · 104 communities (75 shown, 29 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 225 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `46b0fbfb`
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
- toast
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
- PathEditor
- session.js
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
- interpretContent
- Redesign Skill
- Font Licenses
- Windows Build Target
- Storage & Migration Docs
- .offerAutosave
- EXIF Photo Dates
- Linux Build Target
- FontFamily
- Prettier Config
- Studio
- Extra Resources
- Session Start Hook
- Images & Snap Lines Docs
- Form Filling Docs
- Browser-like Navigation Docs
- pdf-font.js
- dialogs.js
- pdfName
- desktop.spec.js
- graphify-standalone.py
- cff.js
- PdfSession
- fonts-panel.js
- .applyEntry
- studio-speichern.spec.js
- PlantPDF

## God Nodes (most connected - your core abstractions)
1. `Studio` - 129 edges
2. `htmlToElement()` - 125 edges
3. `$$` - 96 edges
4. `escapeHtml()` - 92 edges
5. `EditMode` - 89 edges
6. `App` - 88 edges
7. `icon()` - 85 edges
8. `toast()` - 75 edges
9. `PdfSession` - 73 edges
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

## Communities (104 total, 29 thin omitted)

### Community 0 - "Inspector & Font Panels"
Cohesion: 0.07
Nodes (95): installTabStrip(), render(), startDrag(), installTitleBar(), MENUS, chapterLabels(), referenceTargets(), accessForm() (+87 more)

### Community 1 - "ui/recovery.js"
Cohesion: 0.26
Nodes (11): reviveFileHandle(), db(), deleteCopy(), loadCopy(), orphanCopies(), putCopy(), req(), run() (+3 more)

### Community 2 - "Site Plan Geometry"
Cohesion: 0.08
Nodes (60): centroid(), dist(), fmt(), formatArea(), formatLength(), inPolygon(), LEGEND_H, LEGEND_ROWS (+52 more)

### Community 4 - "PDF Form Fields"
Cohesion: 0.08
Nodes (51): appearanceColors(), appearanceFits(), applyFieldValue(), checkboxAppearances(), composeDA(), createField(), deleteField(), describeWidget() (+43 more)

### Community 5 - "render.js"
Cohesion: 0.10
Nodes (46): atomsPush(), chapterPages(), drawLines(), figureAtom(), resolveCell(), tableAtoms(), BODY, manualPages() (+38 more)

### Community 6 - "desktop-bridge.js"
Cohesion: 0.14
Nodes (11): abortError(), COMMANDS, DesktopFileHandle, fileError(), installDesktopBridge(), isDesktop, settle(), studioActive() (+3 more)

### Community 7 - "model.js"
Cohesion: 0.06
Nodes (86): manualEdit, appendToGroup(), BLOCK_TYPES, BUS_KINDS, clamp(), cleanAccess(), cleanCategories(), cleanChapters() (+78 more)

### Community 8 - "Release Workflow"
Cohesion: 0.05
Nodes (48): concurrency, cancel-in-progress, group, run, CSC_IDENTITY_AUTO_DISCOVERY, REF_NAME, skip_regression, jobs (+40 more)

### Community 9 - "toast"
Cohesion: 0.13
Nodes (10): printHtml(), newSymbol(), withoutSecrets(), documentLabel(), failMessage(), readImage(), pickFiles(), showDialog() (+2 more)

### Community 10 - "cff.js"
Cohesion: 0.45
Nodes (6): wrapCffAsOpenType(), addMissingTables(), buildCmapTable(), buildSfnt(), ByteWriter, mergeFontSubsets()

### Community 11 - "Manual Builder"
Cohesion: 0.17
Nodes (41): atomsCallout(), atomsCards(), atomsFigsteps(), atomsFigure(), atomsOf(), atomsSigns(), atomsTable(), base() (+33 more)

### Community 12 - "package.json"
Cohesion: 0.15
Nodes (12): author, name, description, engines, node, license, main, name (+4 more)

### Community 15 - "app.js"
Cohesion: 0.14
Nodes (16): MODE_TOOLS, objectId(), objectIds, readStripSetting(), readWorkspace(), ZOOM_LEVELS, ZOOM_PRESETS, keepTopBarFitting() (+8 more)

### Community 16 - "Playwright Test Setup"
Cohesion: 0.08
Nodes (7): @playwright/test, launch(), openPdf(), setup(), expectUnreadable(), labels(), openManual()

### Community 17 - "Page Organize & Numbering"
Cohesion: 0.15
Nodes (10): approxEqual(), copyRunningElements(), detectPageStructure(), formatPageNumber(), updatePageNumbers(), blockToEditLines(), closeMenu(), showMenu() (+2 more)

### Community 18 - "Inline Text Editor"
Cohesion: 0.11
Nodes (8): LIGATURES, cssRgb(), isLetter(), isLowercase(), parseCssColor(), roundTo(), TextEditor, trackPointer()

### Community 19 - "access.js"
Cohesion: 0.23
Nodes (15): accessPages(), blockHasData(), cellLines(), hasSecrets(), valueText(), cache, context(), ctxs (+7 more)

### Community 20 - "Electron Main Window"
Cohesion: 0.18
Nodes (36): frameColors(), start(), activateNear(), activateTab(), applyFrameColors(), broadcastTabs(), closeTab(), command() (+28 more)

### Community 21 - "font-manager.js"
Cohesion: 0.11
Nodes (13): FontManager, hex4(), isBlankChar(), localFontSources(), nextFontFaceName(), parseFontName(), randomSubsetTag(), STANDARD_FAMILIES (+5 more)

### Community 23 - "PdfFont"
Cohesion: 0.18
Nodes (5): isSpaceCodePoint(), glyphNameToUnicode(), PdfFont, numberOf(), readStreamBytes()

### Community 24 - "Desktop Security & Menu"
Cohesion: 0.11
Nodes (22): contentSecurityPolicy(), EDITOR_HTML, ICON, printErrorText(), ROOT, splitEditor(), hardenSession(), lastDirectory() (+14 more)

### Community 25 - "Regression Test Helpers"
Cohesion: 0.15
Nodes (18): waitForDocument(), canvasHashes(), clientPoint(), findBlock(), FIXTURE, idle(), inkHash(), LAYOUT (+10 more)

### Community 26 - "Desktop Tests & Node APIs"
Cohesion: 0.07
Nodes (24): DIST, PORT, TYPES, build(), buildWorkerSource(), fill(), FONT_DIR, ICON_DIR (+16 more)

### Community 27 - "Signature Storage (IndexedDB)"
Cohesion: 0.17
Nodes (24): addSignature(), deleteSignature(), emit(), getDefaultSignature(), getSignature(), listeners, listSignatures(), newId() (+16 more)

### Community 28 - "studio.js"
Cohesion: 0.12
Nodes (30): liveWindows(), AUTO, autoMeta(), db(), deleteAutosave(), deleteDraft(), deleteTemplate(), HANDOFF (+22 more)

### Community 29 - "Auto-Updater"
Cohesion: 0.16
Nodes (22): autoCheck(), installUpdate(), manualCheck(), allowedUrl(), DOWNLOAD_HOSTS, isNewer(), LATEST_URL, pickUpdate() (+14 more)

### Community 30 - "edit-mode.js"
Cohesion: 0.23
Nodes (9): subpathsBox(), boxContains(), boxInside(), hexToRgb(), ptToMm(), rgbToHex(), unionBoxes(), blockAt() (+1 more)

### Community 31 - "Auto-Release Workflow"
Cohesion: 0.09
Nodes (22): concurrency, cancel-in-progress, group, GH_TOKEN, jobs, tag, name, on (+14 more)

### Community 33 - "signature-extract.js"
Cohesion: 0.16
Nodes (19): clamp01(), cropToAlpha(), dilate(), estimateBackground(), extractSignature(), histPercentile(), INK_COLORS, luminanceOf() (+11 more)

### Community 35 - "licenses.mjs"
Cohesion: 0.13
Nodes (10): FONT_DIR, line, lock, OUT_DIR, packages, parts, pkg, ROOT (+2 more)

### Community 37 - "Stream Limits & Ligatures"
Cohesion: 0.20
Nodes (16): assertDecodedSize(), checkDecodedSize(), checkFlate(), earlyChange(), filterNames(), lzwDecodedLength(), MAX_CONTENT_BYTES, MAX_CONTENT_GLYPHS (+8 more)

### Community 38 - "PathEditor"
Cohesion: 0.13
Nodes (27): invertMatrix(), multiplyMatrix(), transformPoint(), bezier(), deleteNodes(), deleteSegment(), detachSegment(), flattenSeg() (+19 more)

### Community 40 - "NSIS Installer Config"
Cohesion: 0.11
Nodes (19): nsis, allowElevation, allowToChangeInstallationDirectory, artifactName, createDesktopShortcut, createStartMenuShortcut, deleteAppDataOnUninstall, differentialPackage (+11 more)

### Community 42 - "devDependencies"
Cohesion: 0.15
Nodes (13): devDependencies, @agentclientprotocol/claude-agent-acp@0.100.0, @e2e-dev/acp@0.1.0, electron@44.5.1, electron-builder@26.15.3, esbuild@0.28.2, @playwright/test@1.56.1, prettier@3.9.9 (+5 more)

### Community 43 - "Interaction Tests"
Cohesion: 0.15
Nodes (9): settled(), clickAt(), DIR, drag(), escape(), GRAFIK, pt(), pts() (+1 more)

### Community 44 - "File Access Grants"
Cohesion: 0.20
Nodes (8): FileAccess, FileAccessError, isPdfPath(), MESSAGES, pdfPathsFromArgv(), printRequestFromArgv(), renameWithRetry(), RETRY_CODES

### Community 45 - "signature-panel.js"
Cohesion: 0.13
Nodes (20): CAPTURE_DPI, decodeImageFile(), downscaleImage(), encodePng(), imageToCanvas(), MAX_PROCESS_PX, pickPageRegion(), renderPdfRegion() (+12 more)

### Community 46 - "scripts"
Cohesion: 0.15
Nodes (13): scripts, app, build, build:desktop, dev, dist:linux, dist:win, fixtures (+5 more)

### Community 49 - "e2e"
Cohesion: 0.27
Nodes (6): serve, DOKUMENT_PDF_B64, e2e@0.22.0, @e2e-dev/web@0.15.4, e2e, @e2e-dev/web

### Community 50 - "High-Zoom Detail Renderer"
Cohesion: 0.23
Nodes (6): area(), DETAIL_MAX_PX, DetailRenderer, grow(), intersect(), OVERSCAN

### Community 51 - "Security Tests"
Cohesion: 0.17
Nodes (11): extractText(), activePdf(), badWindowBomb(), bombPdf(), entries(), inspect(), modelAfterOpen(), N() (+3 more)

### Community 52 - "dependencies"
Cohesion: 0.20
Nodes (10): dependencies, pako@1.0.11, pdf-lib@1.17.1, @pdf-lib/fontkit@1.1.1, pdfjs-dist@4.10.38, qrcode-generator@2.0.4, pako, @pdf-lib/fontkit (+2 more)

### Community 54 - "wiring.js"
Cohesion: 0.13
Nodes (31): LEGACY_COLUMNS, TERMINAL_COLUMNS, color(), boxText(), busLabel(), catColor(), categoryOf(), catStroke() (+23 more)

### Community 55 - "Brand & Rendering Docs"
Cohesion: 0.18
Nodes (12): plantpdf-app.svg App icon (graphite tile), Brand colors (Petrol, Orange, Flansch), PlantPDF Markenpaket (brand package), plantpdf-document.svg Document icon, Bundled pdf.js (GlobalWorkerOptions, worker blob), Zoomen bis 3200 % und Hand-Werkzeug, Build (scripts/build.mjs, esbuild IIFE), pdf.js (+4 more)

### Community 56 - "PathEditor"
Cohesion: 0.20
Nodes (4): cloneSubpaths(), pagePaths(), constrainAngle(), PathEditor

### Community 57 - "session.js"
Cohesion: 0.15
Nodes (18): bytesToHexString(), bytesToLatin1(), ContentOp, DELIMITERS, DictToken, formatNumber(), latin1ToBytes(), NameToken (+10 more)

### Community 59 - "Text Layout Analysis"
Cohesion: 0.33
Nodes (9): buildTextBlocks(), buildTextLines(), finalizeBlock(), findNear(), hasJustifiedRightEdge(), isSpaceChar(), isUpright(), onSameBaseline() (+1 more)

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
Cohesion: 0.24
Nodes (10): PDF-Editor 1.0 (legacy single-file build), Legacy app shell (top bar, left panel, ctx bar, pages, nav, thumbs rail), Legacy CSS design tokens (:root --ink/--acc ...), Legacy start page (drop zone, features, recent), Legacy organize-pages UI (insert, rotate, duplicate, delete, export), Legacy inline text editor (te-frame), Seiten organisieren / Seitenzahlen anpassen, Text bearbeiten (+2 more)

### Community 66 - "export.js"
Cohesion: 0.11
Nodes (18): assertPrintable(), canMakePdf(), contentFingerprint(), embedProject(), hasProject(), makePdf(), maker(), readProject() (+10 more)

### Community 68 - "pdf-lib"
Cohesion: 0.11
Nodes (4): pdf-lib, formPdf(), N(), savedBytes()

### Community 69 - "Zoom Tests"
Cohesion: 0.20
Nodes (4): BUILDS, objectsOf(), zoomIdle(), zoomOnto()

### Community 70 - "overlays.js"
Cohesion: 0.42
Nodes (7): overlayEdit, overlaySvg(), QR_CAPTION_H, qrCaption(), qrSvg(), qrText(), serialSources()

### Community 71 - "Electron Fuses"
Cohesion: 0.25
Nodes (8): electronFuses, enableCookieEncryption, enableEmbeddedAsarIntegrityValidation, enableNodeCliInspectArguments, enableNodeOptionsEnvironmentVariable, grantFileProtocolExtraPrivileges, onlyLoadAppFromAsar, runAsNode

### Community 72 - "Security & Update Docs"
Cohesion: 0.25
Nodes (4): Update-Suche über GitHub, Desktop-App (Electron), Release / Auto-Release GitHub workflows, Updater (GitHub releases, SHA-256 check)

### Community 73 - "interpretContent"
Cohesion: 0.22
Nodes (7): interpretContent(), resolveColorSpace(), toRgb(), IDENTITY_MATRIX, toNumber(), PathRecorder, nameText()

### Community 75 - "Font Licenses"
Cohesion: 0.38
Nodes (7): Barlow font (The Barlow Project Authors), Barlow Font License (SIL OFL 1.1), SIL Open Font License 1.1, IBM Plex font (Reserved Font Name Plex), IBM Plex Font License (SIL OFL 1.1), Bedienungsanleitung template (bilingual), Schriften (built-in Barlow, IBM Plex Mono, custom font loading)

### Community 76 - "Windows Build Target"
Cohesion: 0.29
Nodes (7): arch, target, win, icon, legalTrademarks, requestedExecutionLevel, target

### Community 77 - "Storage & Migration Docs"
Cohesion: 0.29
Nodes (6): IndexedDB pdf-editor v1, Automatische Wiederherstellung, Umstieg von Version 1.0 (storage migration), Unterschrift hinterlegen und einsetzen, IndexedDB stores (pdf-editor v2, pdfix-studio), Signature module (extract, capture, draw, store)

### Community 78 - ".offerAutosave"
Cohesion: 0.25
Nodes (3): pruneImages(), fileLabel(), rememberCompany()

### Community 79 - "EXIF Photo Dates"
Cohesion: 0.60
Nodes (5): ascii(), entries(), exifDate(), photoDate(), toIso()

### Community 80 - "Linux Build Target"
Cohesion: 0.50
Nodes (4): linux, category, icon, target

### Community 81 - "FontFamily"
Cohesion: 0.13
Nodes (3): FontFamily, fontKey(), FontLibrary

### Community 82 - "Prettier Config"
Cohesion: 0.50
Nodes (3): printWidth, singleQuote, trailingComma

### Community 83 - "Studio"
Cohesion: 0.07
Nodes (6): newAccess(), newPhotos(), toolOf(), inArea(), nextPinName(), Studio

### Community 84 - "Extra Resources"
Cohesion: 0.67
Nodes (3): extraResources, from, to

### Community 89 - "pdf-font.js"
Cohesion: 0.24
Nodes (14): glyphIdSetCache, mappedGlyphIds(), parseSfnt(), readAdvanceWidths(), readCmaps(), readFontInfo(), readGlyphData(), readLeftSideBearings() (+6 more)

### Community 90 - "dialogs.js"
Cohesion: 0.29
Nodes (10): cleanWiringPresets(), defaultWiringPresets(), loadWiringPresets(), resetWiringPresets(), saveWiringPresets(), showPresetsDialog(), injectStudioCss(), downloadBytes() (+2 more)

### Community 91 - "pdfName"
Cohesion: 0.21
Nodes (3): PdfFontCache, pdfName(), repairStreamLengths()

### Community 92 - "desktop.spec.js"
Cohesion: 0.15
Nodes (3): ELECTRON, hasXdotool, ROOT

### Community 95 - "cff.js"
Cohesion: 0.36
Nodes (9): buildCffDisplayFont(), glyphNameCandidates(), readCffCharset(), readCffDict(), readCffIndex(), readUint16(), readUintN(), GLYPH_TABLES (+1 more)

### Community 103 - "PlantPDF"
Cohesion: 0.67
Nodes (4): Former name PDFix (until 2.13), LIESMICH user manual (PlantPDF), Julius Steiner (Developer), PlantPDF

## Ambiguous Edges - Review These
- `Automatische Wiederherstellung` → `IndexedDB stores (pdf-editor v2, pdfix-studio)`  [AMBIGUOUS]
  LIESMICH.txt · relation: shares_data_with

## Knowledge Gaps
- **18 isolated node(s):** `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)`, `ToUnicode CMap generation (Adobe-Identity-UCS)`, `Fotodokumentation linked to Lageplan` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 428 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `pdf-lib` connect `pdf-lib` to `PDF Form Fields`, `package.json`, `app.js`, `Page Organize & Numbering`, `font-manager.js`, `Desktop Tests & Node APIs`, `studio.js`, `licenses.mjs`, `Stream Limits & Ligatures`, `Interaction Tests`, `Security Tests`, `dependencies`, `session.js`, `active-content.js`, `export.js`, `Zoom Tests`, `interpretContent`, `pdf-font.js`, `desktop.spec.js`, `signature.spec.js`?**
  _High betweenness centrality (0.226) - this node is a cross-community bridge._
- **What connects `plantpdf-app.svg App icon (graphite tile)`, `Zoomen bis 3200 % und Hand-Werkzeug`, `Schnelldruck (silent print via ProgID verbs)` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Inspector & Font Panels` be split into smaller, more focused modules?**
  _Cohesion score 0.07006151742993848 - nodes in this community are weakly interconnected._
- **Why does `$$` connect `FormDesign` to `Inspector & Font Panels`, `ui/recovery.js`, `Site Plan Geometry`, `EditMode`, `PDF Form Fields`, `model.js`, `.onKey`, `app.js`, `Page Organize & Numbering`, `studio.js`, `edit-mode.js`, `.openBytes`, `App`, `.onDown`, `.build`, `signature-panel.js`, `notifyDocumentState`, `export.js`, `overlays.js`, `.offerAutosave`, `Studio`, `dialogs.js`, `.rebuildPages`, `fonts-panel.js`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `Site Plan Geometry` be split into smaller, more focused modules?**
  _Cohesion score 0.08018648018648018 - nodes in this community are weakly interconnected._
- **Why does `start()` connect `Electron Main Window` to `Desktop Security & Menu`, `Window State`, `File Access Grants`, `Auto-Updater`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Automatische Wiederherstellung` and `IndexedDB stores (pdf-editor v2, pdfix-studio)`?**
  _Edge tagged AMBIGUOUS (relation: shares_data_with) - confidence is low._