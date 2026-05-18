<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>UniTracker</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --primary:#6366f1;--primary-dark:#4f46e5;--secondary:#10b981;
  --warning:#f59e0b;--danger:#ef4444;--dark:#1e1b4b;
  --gray:#64748b;--light:#f8fafc;--card-bg:#fff;
  --shadow:0 4px 6px -1px rgba(0,0,0,.1);
}
body{font-family:'Segoe UI',sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;padding:20px;}
.container{max-width:1400px;margin:0 auto;}

header{background:var(--card-bg);border-radius:20px;padding:22px 32px;margin-bottom:22px;box-shadow:var(--shadow);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;}
.logo{display:flex;align-items:center;gap:14px;}
.logo-icon{width:48px;height:48px;background:linear-gradient(135deg,var(--primary),#8b5cf6);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;}
.logo h1{color:var(--dark);font-size:1.7rem;}
.logo p{color:var(--gray);font-size:.85rem;}
.user-info{display:flex;gap:12px;flex-wrap:wrap;}
.user-info input{padding:10px 14px;border:2px solid #e2e8f0;border-radius:10px;font-size:.95rem;width:190px;}
.user-info input:focus{outline:none;border-color:var(--primary);}

nav{background:var(--card-bg);border-radius:14px;padding:8px;margin-bottom:22px;box-shadow:var(--shadow);display:flex;gap:8px;flex-wrap:wrap;}
.nav-btn{padding:11px 22px;border:none;border-radius:10px;background:transparent;color:var(--gray);font-size:.95rem;cursor:pointer;transition:all .3s;white-space:nowrap;}
.nav-btn:hover{background:#f1f5f9;}
.nav-btn.active{background:var(--primary);color:#fff;}
.tab-content{display:none;}
.tab-content.active{display:block;}

.card{background:var(--card-bg);border-radius:15px;padding:24px;box-shadow:var(--shadow);margin-bottom:20px;}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;}
.card-header h2{color:var(--dark);font-size:1.35rem;}

.btn{padding:10px 20px;border:none;border-radius:8px;cursor:pointer;font-size:.92rem;transition:all .3s;display:inline-flex;align-items:center;gap:7px;}
.btn-primary{background:var(--primary);color:#fff;}
.btn-primary:hover{background:var(--primary-dark);}
.btn-secondary{background:#e2e8f0;color:var(--dark);}
.btn-secondary:hover{background:#cbd5e1;}
.btn-danger{background:var(--danger);color:#fff;}
.btn-success{background:var(--secondary);color:#fff;}
.btn-warning{background:var(--warning);color:#fff;}
.btn-sm{padding:6px 12px;font-size:.82rem;}

.form-group{margin-bottom:14px;}
.form-group label{display:block;margin-bottom:5px;color:var(--dark);font-weight:500;font-size:.9rem;}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:11px;border:2px solid #e2e8f0;border-radius:8px;font-size:.95rem;font-family:inherit;}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:var(--primary);}
.form-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;}

.modal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;align-items:center;justify-content:center;padding:20px;}
.modal.active{display:flex;}
.modal-content{background:var(--card-bg);border-radius:20px;padding:28px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;}
.modal-header h2{color:var(--dark);font-size:1.3rem;}
.close-btn{background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--gray);}

.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px;margin-bottom:22px;}
.stat-card{background:var(--card-bg);border-radius:14px;padding:22px;box-shadow:var(--shadow);}
.stat-card h3{color:var(--gray);font-size:.85rem;margin-bottom:8px;}
.stat-card .val{font-size:2.2rem;font-weight:700;}
.stat-card .sub{color:var(--gray);font-size:.82rem;margin-top:4px;}
.s-gpa .val{color:var(--primary);}
.s-courses .val{color:var(--secondary);}
.s-tasks .val{color:var(--warning);}
.s-study .val{color:#8b5cf6;}

.charts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:20px;margin-bottom:22px;}
.bar-chart{display:flex;align-items:flex-end;gap:7px;height:170px;padding:0 6px;border-bottom:2px solid #e2e8f0;margin-bottom:8px;}
.bar-group{flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end;}
.bar{width:100%;max-width:48px;border-radius:6px 6px 0 0;transition:height .5s;min-height:2px;position:relative;}
.bar .bv{position:absolute;top:-19px;left:50%;transform:translateX(-50%);font-size:.7rem;font-weight:600;color:var(--dark);white-space:nowrap;}
.bar-label{font-size:.68rem;color:var(--gray);margin-top:6px;text-align:center;}

.productivity-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-bottom:22px;}
.prod-card{background:var(--card-bg);border-radius:15px;padding:22px;box-shadow:var(--shadow);}
.prod-card h3{color:var(--dark);font-size:1.1rem;margin-bottom:16px;}
.day-heatmap{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:10px;}
.heat-cell{border-radius:6px;padding:10px 4px;text-align:center;transition:all .3s;}
.heat-cell .day-name{font-size:.65rem;opacity:.8;margin-bottom:4px;}
.heat-cell .day-hrs{font-size:.85rem;font-weight:700;}
.heat-0{background:#f1f5f9;color:#94a3b8;}
.heat-1{background:#e0e7ff;color:#6366f1;}
.heat-2{background:#c7d2fe;color:#4f46e5;}
.heat-3{background:#a5b4fc;color:#3730a3;}
.heat-4{background:#818cf8;color:#fff;}
.heat-5{background:#6366f1;color:#fff;}
.prod-insight{display:flex;align-items:center;gap:12px;padding:12px;background:#f8fafc;border-radius:10px;margin-bottom:10px;}
.prod-insight .pi-icon{font-size:1.6rem;}
.prod-insight .pi-info .pi-label{font-size:.78rem;color:var(--gray);font-weight:500;}
.prod-insight .pi-info .pi-value{font-size:1rem;font-weight:700;color:var(--dark);}
.prod-score{text-align:center;padding:20px;background:linear-gradient(135deg,var(--primary),#8b5cf6);border-radius:14px;color:#fff;margin-bottom:14px;}
.prod-score .score-val{font-size:3.5rem;font-weight:700;}
.prod-score .score-label{opacity:.85;font-size:.9rem;}
.score-bar-wrap{background:rgba(255,255,255,.2);border-radius:20px;height:10px;margin-top:12px;}
.score-bar-fill{background:#fff;border-radius:20px;height:100%;transition:width .8s;}
.streak-badge{display:inline-flex;align-items:center;gap:5px;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;padding:5px 13px;border-radius:20px;font-weight:600;font-size:.85rem;}

.course-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:20px;}
.course-card{border-radius:15px;padding:20px;color:#fff;position:relative;overflow:hidden;}
.course-card::before{content:'';position:absolute;top:-40%;right:-40%;width:80%;height:80%;background:rgba(255,255,255,.08);border-radius:50%;}
.course-card h3{font-size:1.2rem;margin-bottom:3px;padding-right:60px;}
.course-card .code{opacity:.8;font-size:.85rem;margin-bottom:12px;}
.course-card .grade-badge{position:absolute;top:18px;right:18px;font-size:1.6rem;font-weight:700;}
.course-card .details{display:flex;justify-content:space-between;font-size:.83rem;opacity:.9;}
.course-card .cc-btn{background:rgba(255,255,255,.2);border:none;color:#fff;padding:6px 12px;border-radius:7px;cursor:pointer;font-size:.8rem;transition:all .3s;}
.course-card .cc-btn:hover{background:rgba(255,255,255,.35);}
.course-card .actions{margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;}
.week-notes-section{margin-top:14px;border-top:1px solid rgba(255,255,255,.2);padding-top:12px;}
.week-notes-section h4{font-size:.82rem;opacity:.9;margin-bottom:8px;}
.week-selector{display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;}
.week-selector select{padding:7px 10px;border-radius:7px;border:none;font-size:.82rem;background:rgba(255,255,255,.2);color:#fff;cursor:pointer;}
.week-selector select option{color:var(--dark);background:#fff;}
.note-file{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.15);border-radius:6px;padding:5px 9px;margin-bottom:4px;font-size:.78rem;}
.note-file a{color:#fff;text-decoration:none;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.note-file a:hover{text-decoration:underline;}
.note-file .del-note{background:rgba(255,255,255,.2);border:none;color:#fff;cursor:pointer;border-radius:4px;padding:2px 6px;font-size:.72rem;}
.week-upload-input{display:none;}
.course-assignments{margin-top:12px;border-top:1px solid rgba(255,255,255,.2);padding-top:10px;}
.course-assignments h4{font-size:.82rem;opacity:.9;margin-bottom:8px;}
.mini-assignment{display:flex;align-items:center;gap:7px;padding:6px 8px;background:rgba(255,255,255,.12);border-radius:6px;margin-bottom:5px;font-size:.78rem;cursor:pointer;transition:all .3s;}
.mini-assignment:hover{background:rgba(255,255,255,.22);}
.mini-assignment .ma-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.mini-assignment .ma-title{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.mini-assignment .ma-due{opacity:.8;font-size:.72rem;}

.assign-item{display:flex;align-items:center;padding:14px;border-radius:10px;margin-bottom:10px;background:#f8fafc;gap:13px;flex-wrap:wrap;}
.assign-item.done{opacity:.55;}
.checkbox{width:23px;height:23px;min-width:23px;border:2px solid var(--primary);border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;}
.assign-item.done .checkbox{background:var(--secondary);border-color:var(--secondary);}
.assign-info{flex:1;min-width:130px;}
.assign-title{font-weight:600;color:var(--dark);}
.assign-item.done .assign-title{text-decoration:line-through;}
.assign-meta{font-size:.8rem;color:var(--gray);margin-top:3px;}
.due-badge{padding:4px 10px;border-radius:20px;font-size:.75rem;font-weight:500;white-space:nowrap;}
.due-urgent{background:#fef2f2;color:var(--danger);}
.due-soon{background:#fffbeb;color:var(--warning);}
.due-later{background:#f0fdf4;color:var(--secondary);}
.due-done{background:#f0fdf4;color:var(--secondary);}
.pri{padding:3px 8px;border-radius:5px;font-size:.7rem;font-weight:600;text-transform:uppercase;}
.pri-high{background:#fef2f2;color:var(--danger);}
.pri-medium{background:#fffbeb;color:var(--warning);}
.pri-low{background:#f0fdf4;color:var(--secondary);}
.filter-group{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
.filter-btn{padding:7px 14px;border:1px solid #e2e8f0;border-radius:20px;background:#fff;cursor:pointer;transition:all .3s;font-size:.88rem;}
.filter-btn.active{background:var(--primary);color:#fff;border-color:var(--primary);}

.inner-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
.inner-tab{padding:9px 18px;border:2px solid #e2e8f0;border-radius:10px;background:#fff;cursor:pointer;font-size:.9rem;transition:all .3s;color:var(--gray);}
.inner-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);}
.inner-panel{display:none;}
.inner-panel.active{display:block;}

.project-card{background:#fff;border-radius:14px;padding:22px;margin-bottom:16px;box-shadow:var(--shadow);border-left:5px solid #94a3b8;transition:border-color .3s;}
.project-card.status-planning{border-left-color:#94a3b8;}
.project-card.status-in-progress{border-left-color:var(--warning);}
.project-card.status-completed{border-left-color:var(--secondary);}
.project-card.status-on-hold{border-left-color:var(--danger);}
.project-top{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap;margin-bottom:14px;}
.project-top h3{color:var(--dark);font-size:1.1rem;font-weight:700;line-height:1.3;}
.project-top-right{display:flex;gap:8px;align-items:center;flex-wrap:wrap;flex-shrink:0;}
.proj-badge{padding:4px 10px;border-radius:20px;font-size:.75rem;font-weight:600;display:inline-block;}
.proj-meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;}
.proj-planning{background:#f1f5f9;color:var(--gray);}
.proj-in-progress{background:#fffbeb;color:var(--warning);}
.proj-completed{background:#f0fdf4;color:var(--secondary);}
.proj-on-hold{background:#fef2f2;color:var(--danger);}
.project-desc{color:var(--gray);font-size:.87rem;margin-bottom:14px;line-height:1.5;}
.prog-bar-wrap{background:#e2e8f0;border-radius:10px;height:8px;overflow:hidden;margin-bottom:6px;}
.prog-bar-fill{height:100%;border-radius:10px;background:linear-gradient(90deg,var(--primary),#8b5cf6);transition:width .5s;}
.prog-text{font-size:.75rem;color:var(--gray);margin-bottom:14px;}
.subtasks-section{margin-bottom:14px;}
.subtasks-section h4{font-size:.85rem;color:var(--gray);font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:.05em;}
.subtask-item{display:flex;align-items:center;gap:10px;padding:9px 12px;background:#f8fafc;border-radius:8px;margin-bottom:6px;transition:background .2s;}
.subtask-item:hover{background:#f1f5f9;}
.subtask-item.st-done{opacity:.7;}
.st-check{width:20px;height:20px;min-width:20px;border:2px solid var(--primary);border-radius:5px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;transition:all .2s;}
.subtask-item.st-done .st-check{background:var(--secondary);border-color:var(--secondary);}
.st-title{flex:1;font-size:.88rem;color:var(--dark);}
.subtask-item.st-done .st-title{text-decoration:line-through;color:var(--gray);}
.st-del{background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:.85rem;padding:2px 4px;border-radius:4px;transition:color .2s;}
.st-del:hover{color:var(--danger);}
.add-subtask-row{display:flex;gap:8px;margin-top:8px;}
.add-subtask-row input{flex:1;padding:8px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:.87rem;}
.add-subtask-row input:focus{outline:none;border-color:var(--primary);}
.members-section{margin-top:14px;padding-top:14px;border-top:1px solid #f1f5f9;}
.members-section h4{font-size:.85rem;color:var(--gray);font-weight:600;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;}
.member-list{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;}
.member-chip{display:flex;align-items:center;gap:7px;padding:7px 12px;border-radius:30px;font-size:.82rem;font-weight:500;background:#f1f5f9;color:var(--dark);}
.member-chip .member-avatar{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:700;color:#fff;flex-shrink:0;}
.member-chip .member-info{display:flex;flex-direction:column;line-height:1.2;}
.member-chip .member-name{font-weight:600;font-size:.82rem;}
.member-chip .member-role{font-size:.7rem;color:var(--gray);}
.member-chip .member-del{background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:.78rem;margin-left:4px;transition:color .2s;}
.member-chip .member-del:hover{color:var(--danger);}
.add-member-row{display:grid;grid-template-columns:1fr 1fr auto;gap:8px;margin-top:8px;align-items:end;}
.add-member-row input,.add-member-row select{padding:8px 10px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;}
.add-member-row input:focus,.add-member-row select:focus{outline:none;border-color:var(--primary);}
.project-log-section{margin-top:14px;padding-top:14px;border-top:1px solid #f1f5f9;}
.project-log-section h4{font-size:.85rem;color:var(--gray);font-weight:600;margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em;}
.log-entries{max-height:200px;overflow-y:auto;margin-bottom:10px;}
.log-entry{display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;}
.log-entry-meta{display:flex;flex-direction:column;align-items:flex-end;min-width:80px;}
.log-date{font-size:.7rem;color:var(--gray);white-space:nowrap;}
.log-content{flex:1;background:#f8fafc;padding:9px 13px;border-radius:8px;font-size:.85rem;color:var(--dark);line-height:1.5;border:1px solid #e2e8f0;}
.log-del{background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:.75rem;transition:color .2s;align-self:flex-start;margin-top:2px;}
.log-del:hover{color:var(--danger);}
.log-input-row{display:flex;gap:8px;}
.log-input-row textarea{flex:1;padding:9px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;resize:none;height:60px;font-family:inherit;}
.log-input-row textarea:focus{outline:none;border-color:var(--primary);}
.log-post-btn{padding:8px 16px;background:var(--primary);color:#fff;border:none;border-radius:8px;cursor:pointer;font-size:.85rem;align-self:flex-end;transition:background .2s;}
.log-post-btn:hover{background:var(--primary-dark);}
.status-select{padding:7px 12px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;background:#fff;color:var(--dark);cursor:pointer;}
.status-select:focus{outline:none;border-color:var(--primary);}

.schedule-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:9px;}
.day-col{background:#f8fafc;border-radius:10px;padding:13px;min-height:300px;}
.day-col h4{text-align:center;margin-bottom:11px;color:var(--dark);padding-bottom:8px;border-bottom:2px solid #e2e8f0;font-size:.88rem;}
.sched-item{background:linear-gradient(135deg,var(--primary),#8b5cf6);color:#fff;border-radius:7px;padding:9px;margin-bottom:8px;font-size:.78rem;position:relative;}
.sched-item .si-time{opacity:.8;font-size:.7rem;}
.sched-item .si-name{font-weight:600;margin:3px 0;}
.sched-item .si-loc{opacity:.8;font-size:.7rem;}
.sched-item .si-del{position:absolute;top:4px;right:4px;background:rgba(255,255,255,.25);border:none;color:#fff;cursor:pointer;border-radius:4px;font-size:.67rem;padding:2px 5px;}

.gpa-hero{text-align:center;padding:26px;background:linear-gradient(135deg,var(--primary),#8b5cf6);border-radius:14px;color:#fff;margin-bottom:22px;}
.gpa-hero .gpa-val{font-size:3.5rem;font-weight:700;}
.gpa-hero p{opacity:.8;margin-top:7px;}
table{width:100%;border-collapse:collapse;}
th,td{padding:13px;text-align:left;border-bottom:1px solid #e2e8f0;font-size:.9rem;}
th{background:#f8fafc;color:var(--dark);font-weight:600;}
tr:hover{background:#f8fafc;}

.timer-wrap{text-align:center;padding:32px;}
.timer-display{font-size:4.5rem;font-weight:700;color:var(--dark);margin:22px 0;font-family:'Courier New',monospace;}
.timer-presets{display:flex;justify-content:center;gap:9px;margin-bottom:16px;flex-wrap:wrap;}
.preset-btn{padding:9px 17px;border:2px solid var(--primary);border-radius:25px;background:transparent;color:var(--primary);cursor:pointer;transition:all .3s;font-size:.88rem;}
.preset-btn:hover,.preset-btn.active{background:var(--primary);color:#fff;}
.custom-row{display:flex;align-items:center;justify-content:center;gap:9px;margin-bottom:22px;flex-wrap:wrap;}
.custom-row input{width:72px;padding:9px;text-align:center;border:2px solid #e2e8f0;border-radius:10px;font-size:1.1rem;font-weight:600;}
.custom-row input:focus{outline:none;border-color:var(--primary);}
.timer-btns{display:flex;justify-content:center;gap:13px;margin-bottom:22px;flex-wrap:wrap;}
.timer-btns .btn{padding:13px 34px;font-size:1rem;}
.log-item{display:flex;justify-content:space-between;padding:11px 14px;background:#f8fafc;border-radius:8px;margin-bottom:7px;align-items:center;font-size:.88rem;}

.budget-top{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:16px;margin-bottom:22px;}
.bc{border-radius:14px;padding:18px;text-align:center;color:#fff;}
.bc h4{opacity:.85;font-size:.85rem;margin-bottom:8px;}
.bc .amt{font-size:1.8rem;font-weight:700;}
.bc-income{background:linear-gradient(135deg,#10b981,#059669);}
.bc-exp{background:linear-gradient(135deg,var(--danger),#dc2626);}
.bc-rem{background:linear-gradient(135deg,var(--primary),#4f46e5);}
.bc-bud{background:linear-gradient(135deg,var(--warning),#d97706);}
.exp-item{display:flex;justify-content:space-between;align-items:center;padding:13px;background:#f8fafc;border-radius:10px;margin-bottom:9px;}
.exp-cat{display:flex;align-items:center;gap:10px;}
.exp-icon{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;}
.pc-record{display:flex;justify-content:space-between;align-items:center;padding:14px;background:#f8fafc;border-radius:11px;margin-bottom:9px;border-left:4px solid var(--secondary);}
.pc-record .pr-info h4{color:var(--dark);font-weight:600;font-size:.95rem;}
.pc-record .pr-info span{font-size:.8rem;color:var(--gray);}
.pc-record .pr-amt{font-size:1.3rem;font-weight:700;color:var(--secondary);}

/* ═══ GRADE CALCULATOR ═══ */
.gc-hero{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px;}
.gc-hero-card{border-radius:14px;padding:22px;text-align:center;color:#fff;position:relative;overflow:hidden;}
.gc-hero-card::before{content:'';position:absolute;top:-30%;right:-30%;width:60%;height:60%;background:rgba(255,255,255,.1);border-radius:50%;}
.gc-hero-card h4{opacity:.85;font-size:.88rem;margin-bottom:8px;}
.gc-hero-card .gcv{font-size:2.4rem;font-weight:700;}
.gc-hero-card .gcs{font-size:.8rem;opacity:.8;margin-top:4px;}
.gc-current{background:linear-gradient(135deg,var(--primary),#8b5cf6);}
.gc-needed{background:linear-gradient(135deg,var(--warning),#d97706);}
.gc-projected{background:linear-gradient(135deg,var(--secondary),#059669);}
.gc-danger{background:linear-gradient(135deg,var(--danger),#dc2626);}

.gc-course-select{display:flex;gap:12px;align-items:center;margin-bottom:20px;flex-wrap:wrap;}
.gc-course-select select{flex:1;min-width:200px;padding:12px;border:2px solid #e2e8f0;border-radius:10px;font-size:.95rem;}
.gc-course-select select:focus{outline:none;border-color:var(--primary);}

.assessment-table{width:100%;border-collapse:collapse;margin-bottom:16px;}
.assessment-table th{background:#f8fafc;padding:12px 14px;text-align:left;font-size:.82rem;color:var(--gray);font-weight:600;text-transform:uppercase;letter-spacing:.05em;}
.assessment-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;vertical-align:middle;}
.assessment-table tr:last-child td{border-bottom:none;}
.assessment-table input[type="text"]{width:100%;padding:8px 10px;border:2px solid #e2e8f0;border-radius:7px;font-size:.9rem;}
.assessment-table input[type="text"]:focus{outline:none;border-color:var(--primary);}
.assessment-table input[type="number"]{width:80px;padding:8px 10px;border:2px solid #e2e8f0;border-radius:7px;font-size:.9rem;text-align:center;}
.assessment-table input[type="number"]:focus{outline:none;border-color:var(--primary);}
.assessment-table input[type="number"].scored{border-color:var(--secondary);background:#f0fdf4;}
.assessment-table input[type="number"].unscored{border-color:#e2e8f0;background:#fffbeb;}
.assessment-table .row-del{background:none;border:none;cursor:pointer;color:#cbd5e1;font-size:1rem;transition:color .2s;padding:4px;}
.assessment-table .row-del:hover{color:var(--danger);}
.weight-badge{display:inline-block;padding:3px 8px;border-radius:10px;font-size:.75rem;font-weight:600;background:#e0e7ff;color:var(--primary);}
.weight-warn{background:#fef2f2;color:var(--danger);}
.weight-ok{background:#f0fdf4;color:var(--secondary);}

.whatif-section{background:linear-gradient(135deg,#f8fafc,#f1f5f9);border-radius:14px;padding:22px;margin-top:20px;border:2px solid #e2e8f0;}
.whatif-section h3{color:var(--dark);font-size:1.1rem;margin-bottom:16px;}
.whatif-row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:14px;}
.whatif-row label{color:var(--gray);font-size:.88rem;font-weight:500;min-width:180px;}
.whatif-slider{flex:1;min-width:180px;height:6px;border-radius:3px;accent-color:var(--primary);cursor:pointer;}
.whatif-value{font-size:1.2rem;font-weight:700;color:var(--primary);min-width:50px;text-align:center;}
.whatif-result{background:#fff;border-radius:12px;padding:18px;margin-top:14px;border:2px solid #e2e8f0;text-align:center;}
.whatif-result .wr-grade{font-size:2.5rem;font-weight:700;margin-bottom:4px;}
.whatif-result .wr-label{font-size:.9rem;color:var(--gray);}
.whatif-result .wr-message{margin-top:10px;font-size:.88rem;padding:10px 16px;border-radius:8px;font-weight:500;}
.msg-great{background:#f0fdf4;color:var(--secondary);}
.msg-ok{background:#fffbeb;color:var(--warning);}
.msg-hard{background:#fef2f2;color:var(--danger);}
.msg-impossible{background:#fef2f2;color:var(--danger);}

.grade-letter-display{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;font-weight:700;font-size:.9rem;}

.needed-table{width:100%;border-collapse:collapse;margin-top:12px;}
.needed-table th{background:#f8fafc;padding:10px 12px;text-align:left;font-size:.8rem;color:var(--gray);font-weight:600;}
.needed-table td{padding:10px 12px;border-bottom:1px solid #f1f5f9;font-size:.88rem;}
.needed-table tr:last-child td{border-bottom:none;}

.weight-progress{height:8px;background:#e2e8f0;border-radius:4px;overflow:hidden;margin-top:8px;}
.weight-progress-fill{height:100%;border-radius:4px;transition:width .3s;}

.gc-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
.gc-tab{padding:9px 18px;border:2px solid #e2e8f0;border-radius:10px;background:#fff;cursor:pointer;font-size:.9rem;transition:all .3s;color:var(--gray);}
.gc-tab.active{background:var(--primary);color:#fff;border-color:var(--primary);}
.gc-panel{display:none;}
.gc-panel.active{display:block;}

.import-notice{background:#eef2ff;border:1px solid #c7d2fe;border-radius:10px;padding:14px 18px;font-size:.87rem;color:var(--primary);margin-bottom:16px;display:flex;align-items:center;gap:10px;}

.empty{text-align:center;padding:40px;color:var(--gray);}
.empty .ei{font-size:3rem;margin-bottom:14px;}

@media(max-width:768px){
  .schedule-grid{grid-template-columns:1fr;}
  .timer-display{font-size:3rem;}
  header{flex-direction:column;text-align:center;}
  .charts-grid,.productivity-grid{grid-template-columns:1fr;}
  .add-member-row{grid-template-columns:1fr;gap:6px;}
  .gc-hero{grid-template-columns:1fr 1fr;}
  .assessment-table input[type="number"]{width:65px;}
}
</style>
</head>
<body>
<div class="container">

<header>
  <div class="logo">
    <div class="logo-icon">🎓</div>
    <div><h1>UniTracker</h1><p>Your University Life Companion</p></div>
  </div>
  <div class="user-info">
    <input type="text" id="studentName" placeholder="Your Name">
    <input type="text" id="semester" placeholder="e.g. Semester 2, 2025">
  </div>
</header>

<nav>
  <button class="nav-btn active" data-tab="dashboard">📊 Dashboard</button>
  <button class="nav-btn" data-tab="courses">📚 Courses</button>
  <button class="nav-btn" data-tab="assignments">📝 Assignments</button>
  <button class="nav-btn" data-tab="schedule">📅 Schedule</button>
  <button class="nav-btn" data-tab="gpa">🎯 GPA</button>
  <button class="nav-btn" data-tab="gradecalc">🧮 Grade Calculator</button>
  <button class="nav-btn" data-tab="timer">⏱️ Study Timer</button>
  <button class="nav-btn" data-tab="budget">💰 Budget</button>
</nav>

<!-- DASHBOARD -->
<div id="dashboard" class="tab-content active">
  <div class="stat-grid">
    <div class="stat-card s-gpa"><h3>Current GPA</h3><div class="val" id="dashGPA">0.00</div><div class="sub">Out of 4.0</div></div>
    <div class="stat-card s-courses"><h3>Active Courses</h3><div class="val" id="dashCourses">0</div><div class="sub" id="dashCredits">0 Credits</div></div>
    <div class="stat-card s-tasks"><h3>Pending Tasks</h3><div class="val" id="dashTasks">0</div><div class="sub" id="dashUrgent">0 Due Soon</div></div>
    <div class="stat-card s-study"><h3>Study This Week</h3><div class="val" id="dashStudy">0h</div><div class="sub" id="dashSessions">0 sessions</div></div>
  </div>
  <div class="productivity-grid">
    <div class="prod-card">
      <h3>🧠 Productivity Score</h3>
      <div class="prod-score">
        <div class="score-val" id="prodScore">0</div>
        <div class="score-label" id="prodScoreLabel">Start studying to build your score</div>
        <div class="score-bar-wrap"><div class="score-bar-fill" id="prodScoreBar" style="width:0%"></div></div>
      </div>
      <div id="prodInsights"></div>
    </div>
    <div class="prod-card">
      <h3>🗓️ Study Heatmap <span class="streak-badge" id="streakBadge">🔥 0 days</span></h3>
      <div class="day-heatmap" id="dayHeatmap"></div>
      <div style="margin-top:15px"><div class="bar-chart" id="heatmapGraph" style="height:100px;border:none;"></div></div>
      <p style="font-size:.75rem;color:var(--gray);text-align:center;margin-top:6px">Average minutes per day of week (all time)</p>
    </div>
  </div>
  <div class="charts-grid">
    <div class="card"><div class="card-header"><h2>📈 Weekly Study Hours</h2></div><div id="weeklyChart"></div></div>
    <div class="card"><div class="card-header"><h2>🎯 Grade Overview</h2></div><div id="gradeChart"></div></div>
  </div>
  <div class="card"><div class="card-header"><h2>📅 Upcoming Deadlines</h2></div><div id="upcomingDeadlines"></div></div>
</div>

<!-- COURSES -->
<div id="courses" class="tab-content">
  <div class="card">
    <div class="card-header"><h2>📚 My Courses</h2><button class="btn btn-primary" onclick="openCourseModal()">+ Add Course</button></div>
    <div class="course-grid" id="courseList"><div class="empty"><div class="ei">📚</div><p>No courses yet</p></div></div>
  </div>
</div>

<!-- ASSIGNMENTS -->
<div id="assignments" class="tab-content">
  <div class="card">
    <div class="card-header"><h2>📝 Assignments & Projects</h2>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="openModal('assignModal')">+ Assignment</button>
        <button class="btn btn-warning" onclick="openProjectModal()">+ Project</button>
      </div>
    </div>
    <div class="inner-tabs">
      <button class="inner-tab active" data-panel="panel-assignments">📋 Assignments</button>
      <button class="inner-tab" data-panel="panel-projects">🗂️ Projects</button>
    </div>
    <div class="inner-panel active" id="panel-assignments">
      <div class="filter-group">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="pending">Pending</button>
        <button class="filter-btn" data-filter="completed">Completed</button>
        <button class="filter-btn" data-filter="high">High Priority</button>
      </div>
      <div id="assignmentList"></div>
    </div>
    <div class="inner-panel" id="panel-projects">
      <div id="projectList"></div>
    </div>
  </div>
</div>

<!-- SCHEDULE -->
<div id="schedule" class="tab-content">
  <div class="card">
    <div class="card-header"><h2>📅 Weekly Schedule</h2><button class="btn btn-primary" onclick="openModal('schedModal')">+ Add Class</button></div>
    <div class="schedule-grid">
      <div class="day-col"><h4>Mon</h4><div class="dc" data-day="monday"></div></div>
      <div class="day-col"><h4>Tue</h4><div class="dc" data-day="tuesday"></div></div>
      <div class="day-col"><h4>Wed</h4><div class="dc" data-day="wednesday"></div></div>
      <div class="day-col"><h4>Thu</h4><div class="dc" data-day="thursday"></div></div>
      <div class="day-col"><h4>Fri</h4><div class="dc" data-day="friday"></div></div>
      <div class="day-col"><h4>Sat</h4><div class="dc" data-day="saturday"></div></div>
      <div class="day-col"><h4>Sun</h4><div class="dc" data-day="sunday"></div></div>
    </div>
  </div>
</div>

<!-- GPA -->
<div id="gpa" class="tab-content">
  <div class="gpa-hero"><h3 style="opacity:.8;margin-bottom:8px">Cumulative GPA</h3><div class="gpa-val" id="calcGPA">0.00</div><p>Based on <span id="totalCr">0</span> credits</p></div>
  <div class="card"><div class="card-header"><h2>📊 Grade Breakdown</h2></div>
    <div style="overflow-x:auto"><table id="gpaTable"><thead><tr><th>Course</th><th>Credits</th><th>Grade</th><th>Grade Points</th></tr></thead><tbody></tbody></table></div>
  </div>
</div>

<!-- ═══ GRADE CALCULATOR ═══ -->
<div id="gradecalc" class="tab-content">

  <!-- Course Selector -->
  <div class="card">
    <div class="card-header"><h2>🧮 Grade Calculator & What-If Tool</h2></div>
    <div class="gc-course-select">
      <select id="gcCourseSelect" onchange="loadGCCourse()">
        <option value="">— Select a course or start fresh —</option>
      </select>
      <button class="btn btn-secondary" onclick="clearGC()">🗑 Clear All</button>
    </div>
    <div class="import-notice">
      <span>💡</span>
      <span>Select a course to auto-import assessments from your Assignments tab, or build your own from scratch below.</span>
    </div>

    <!-- Tabs inside GC -->
    <div class="gc-tabs">
      <button class="gc-tab active" data-gcpanel="gc-builder">📋 Grade Builder</button>
      <button class="gc-tab" data-gcpanel="gc-whatif">🎲 What-If Scenarios</button>
      <button class="gc-tab" data-gcpanel="gc-needed">🎯 What Do I Need?</button>
    </div>

    <!-- GRADE BUILDER -->
    <div class="gc-panel active" id="gc-builder">
      <div class="gc-hero" id="gcHero">
        <div class="gc-hero-card gc-current"><h4>Current Grade</h4><div class="gcv" id="gcCurrentGrade">—</div><div class="gcs" id="gcCurrentLetter">No scores yet</div></div>
        <div class="gc-hero-card gc-projected"><h4>Projected Final</h4><div class="gcv" id="gcProjected">—</div><div class="gcs" id="gcProjectedLabel">Based on scored items</div></div>
        <div class="gc-hero-card gc-needed"><h4>Weight Assigned</h4><div class="gcv" id="gcWeightTotal">0%</div><div class="gcs" id="gcWeightStatus">of 100%</div></div>
        <div class="gc-hero-card gc-danger"><h4>Unscored Weight</h4><div class="gcv" id="gcUnscored">100%</div><div class="gcs">still to come</div></div>
      </div>
      <div class="weight-progress"><div class="weight-progress-fill" id="gcWeightBar" style="width:0%;background:var(--primary)"></div></div>
      <p style="font-size:.78rem;color:var(--gray);margin-bottom:18px">Weight used — aim for 100%</p>

      <table class="assessment-table" id="assessmentTable">
        <thead>
          <tr>
            <th>Assessment</th>
            <th>Type</th>
            <th>Weight %</th>
            <th>Score</th>
            <th>Out of</th>
            <th>Earned %</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="assessmentBody"></tbody>
      </table>
      <button class="btn btn-primary btn-sm" onclick="addAssessmentRow()">+ Add Assessment</button>
    </div>

    <!-- WHAT IF -->
    <div class="gc-panel" id="gc-whatif">
      <p style="color:var(--gray);font-size:.9rem;margin-bottom:20px">Use the sliders to simulate different scores on your remaining assessments and see how your final grade changes.</p>
      <div id="whatifSliders"></div>
      <div class="whatif-result" id="whatifResult" style="display:none">
        <div class="wr-grade" id="wiGrade">—</div>
        <div class="wr-label" id="wiLabel">Projected final grade</div>
        <div class="wr-message" id="wiMessage"></div>
      </div>
    </div>

    <!-- WHAT DO I NEED -->
    <div class="gc-panel" id="gc-needed">
      <p style="color:var(--gray);font-size:.9rem;margin-bottom:20px">See exactly what score you need on each remaining assessment to hit your target grade.</p>
      <div class="form-group" style="max-width:300px">
        <label>Target Final Grade (%)</label>
        <input type="number" id="targetGrade" min="0" max="100" value="70" placeholder="e.g. 70" oninput="calcNeeded()">
      </div>
      <div id="neededResults"></div>
    </div>

  </div>
</div>

<!-- TIMER -->
<div id="timer" class="tab-content">
  <div class="card">
    <div class="timer-wrap">
      <h2>⏱️ Study Timer</h2>
      <div class="timer-presets">
        <button class="preset-btn active" data-min="25">Pomodoro 25m</button>
        <button class="preset-btn" data-min="45">Study 45m</button>
        <button class="preset-btn" data-min="60">Focus 60m</button>
        <button class="preset-btn" data-min="5">Break 5m</button>
        <button class="preset-btn" data-min="custom">⚙️ Custom</button>
      </div>
      <div class="custom-row" id="customRow" style="display:none">
        <input type="number" id="cHours" min="0" max="23" value="0"><span>h</span>
        <input type="number" id="cMins" min="0" max="59" value="25"><span>m</span>
        <input type="number" id="cSecs" min="0" max="59" value="0"><span>s</span>
        <button class="btn btn-primary btn-sm" id="setCustom">Set</button>
      </div>
      <div class="timer-display" id="timerDisplay">25:00</div>
      <div class="timer-btns">
        <button class="btn btn-success" id="btnStart">▶ Start</button>
        <button class="btn btn-secondary" id="btnPause">⏸ Pause</button>
        <button class="btn btn-danger" id="btnReset">🔄 Reset</button>
      </div>
      <div class="form-row" style="max-width:480px;margin:0 auto">
        <div class="form-group"><label>Studying:</label><input type="text" id="studySubject" placeholder="Topic…"></div>
        <div class="form-group"><label>Course:</label><select id="timerCourse"><option value="">General</option></select></div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header"><h2>📋 Study Log</h2><button class="btn btn-secondary btn-sm" onclick="clearLog()">Clear</button></div>
    <div id="studyLog"><div class="empty"><div class="ei">📖</div><p>No sessions yet</p></div></div>
  </div>
</div>

<!-- BUDGET -->
<div id="budget" class="tab-content">
  <div class="budget-top">
    <div class="bc bc-income"><h4>💵 Total Income</h4><div class="amt" id="budIncome">$0.00</div></div>
    <div class="bc bc-exp"><h4>💸 Expenses</h4><div class="amt" id="budExp">$0.00</div></div>
    <div class="bc bc-rem"><h4>💰 Net Balance</h4><div class="amt" id="budRem">$0.00</div></div>
    <div class="bc bc-bud"><h4>📋 Monthly Budget</h4><div class="amt" id="budSet">$0.00</div></div>
  </div>
  <div class="card">
    <div class="card-header"><h2>💵 Paychecks</h2><button class="btn btn-success" onclick="openModal('paycheckModal')">+ Add Paycheck</button></div>
    <div id="paycheckList"><div class="empty"><div class="ei">💵</div><p>No paychecks yet</p></div></div>
  </div>
  <div class="card">
    <div class="card-header"><h2>📝 Expenses</h2>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <input type="number" id="budgetInput" placeholder="Set monthly budget $" style="padding:9px;border:2px solid #e2e8f0;border-radius:8px;font-size:.88rem;width:190px;" onchange="setBudget()">
        <button class="btn btn-primary" onclick="openModal('expenseModal')">+ Expense</button>
      </div>
    </div>
    <div id="expenseList"><div class="empty"><div class="ei">💸</div><p>No expenses yet</p></div></div>
  </div>
</div>

</div><!-- /container -->

<!-- ═══ MODALS ═══ -->
<div class="modal" id="courseModal">
  <div class="modal-content">
    <div class="modal-header"><h2 id="courseModalTitle">Add Course</h2><button class="close-btn" onclick="closeCourseModal()">&times;</button></div>
    <form id="courseForm">
      <input type="hidden" id="cEditId">
      <div class="form-group"><label>Course Name</label><input type="text" id="cName" required placeholder="e.g. Data Structures"></div>
      <div class="form-row">
        <div class="form-group"><label>Course Code</label><input type="text" id="cCode" required placeholder="CS201"></div>
        <div class="form-group"><label>Credits</label><input type="number" id="cCredits" required min="1" max="12" placeholder="3"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Instructor</label><input type="text" id="cInstructor" placeholder="Dr. Smith"></div>
        <div class="form-group"><label>Current Grade</label>
          <select id="cGrade">
            <option value="">Not graded</option>
            <option value="4.0">A (4.0)</option><option value="3.7">A- (3.7)</option>
            <option value="3.3">B+ (3.3)</option><option value="3.0">B (3.0)</option><option value="2.7">B- (2.7)</option>
            <option value="2.3">C+ (2.3)</option><option value="2.0">C (2.0)</option><option value="1.7">C- (1.7)</option>
            <option value="1.3">D+ (1.3)</option><option value="1.0">D (1.0)</option><option value="0.0">F (0.0)</option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%">Save Course</button>
    </form>
  </div>
</div>

<div class="modal" id="assignModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Assignment</h2><button class="close-btn" onclick="closeModal('assignModal')">&times;</button></div>
    <form id="assignForm">
      <div class="form-group"><label>Title</label><input type="text" id="aTitle" required placeholder="e.g. Research Paper"></div>
      <div class="form-group"><label>Course</label><select id="aCourse" required><option value="">Select course</option></select></div>
      <div class="form-row">
        <div class="form-group"><label>Due Date</label><input type="date" id="aDue" required></div>
        <div class="form-group"><label>Priority</label>
          <select id="aPriority"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Type</label>
          <select id="aType">
            <option value="assignment">📋 Assignment</option><option value="quiz">📝 Quiz</option>
            <option value="exam">📚 Exam</option><option value="project">🗂️ Project</option><option value="other">📌 Other</option>
          </select>
        </div>
        <div class="form-group"><label>Weight (%)</label><input type="number" id="aWeight" min="0" max="100" placeholder="e.g. 20"></div>
      </div>
      <div class="form-group"><label>Notes</label><textarea id="aNotes" rows="3" placeholder="Additional details…"></textarea></div>
      <button type="submit" class="btn btn-primary" style="width:100%">Add Assignment</button>
    </form>
  </div>
</div>

<div class="modal" id="projectModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Create Project</h2><button class="close-btn" onclick="closeModal('projectModal')">&times;</button></div>
    <form id="projectForm">
      <div class="form-group"><label>Project Title</label><input type="text" id="pTitle" required placeholder="e.g. Group Research Project"></div>
      <div class="form-group"><label>Course</label><select id="pCourse"><option value="">Not linked</option></select></div>
      <div class="form-row">
        <div class="form-group"><label>Due Date</label><input type="date" id="pDue" required></div>
        <div class="form-group"><label>Status</label>
          <select id="pStatus">
            <option value="planning">📋 Planning</option><option value="in-progress">🚧 In Progress</option>
            <option value="on-hold">⏸ On Hold</option><option value="completed">✅ Completed</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Priority</label>
          <select id="pPriority"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option></select>
        </div>
        <div class="form-group"><label>Weight (%)</label><input type="number" id="pWeight" min="0" max="100" placeholder="e.g. 30"></div>
      </div>
      <div class="form-group"><label>Description</label><textarea id="pDesc" rows="3" placeholder="What is this project about?"></textarea></div>
      <div class="form-group"><label>Initial Subtasks — one per line</label><textarea id="pSubtasks" rows="4" placeholder="Research topic&#10;Write outline&#10;Create slides"></textarea></div>
      <button type="submit" class="btn btn-warning" style="width:100%">Create Project</button>
    </form>
  </div>
</div>

<div class="modal" id="schedModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Class to Schedule</h2><button class="close-btn" onclick="closeModal('schedModal')">&times;</button></div>
    <form id="schedForm">
      <div class="form-group"><label>Course</label><select id="sCourse" required><option value="">Select</option></select></div>
      <div class="form-group"><label>Day</label>
        <select id="sDay" required>
          <option value="monday">Monday</option><option value="tuesday">Tuesday</option><option value="wednesday">Wednesday</option>
          <option value="thursday">Thursday</option><option value="friday">Friday</option><option value="saturday">Saturday</option><option value="sunday">Sunday</option>
        </select>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Start</label><input type="time" id="sStart" required></div>
        <div class="form-group"><label>End</label><input type="time" id="sEnd" required></div>
      </div>
      <div class="form-group"><label>Location</label><input type="text" id="sLoc" placeholder="Room 204"></div>
      <button type="submit" class="btn btn-primary" style="width:100%">Add to Schedule</button>
    </form>
  </div>
</div>

<div class="modal" id="paycheckModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Paycheck</h2><button class="close-btn" onclick="closeModal('paycheckModal')">&times;</button></div>
    <form id="paycheckForm">
      <div class="form-group"><label>Employer / Source</label><input type="text" id="pcEmp" required placeholder="Part-time job…"></div>
      <div class="form-row">
        <div class="form-group"><label>Gross Pay ($)</label><input type="number" id="pcGross" step="0.01" min="0" placeholder="0.00"></div>
        <div class="form-group"><label>Net Pay ($)</label><input type="number" id="pcNet" required step="0.01" min="0" placeholder="0.00"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Federal Tax ($)</label><input type="number" id="pcFed" step="0.01" min="0" placeholder="0.00"></div>
        <div class="form-group"><label>State Tax ($)</label><input type="number" id="pcState" step="0.01" min="0" placeholder="0.00"></div>
      </div>
      <div class="form-group"><label>Pay Date</label><input type="date" id="pcDate" required></div>
      <div class="form-group"><label>Hours Worked</label><input type="number" id="pcHours" step="0.5" min="0" placeholder="e.g. 40"></div>
      <button type="submit" class="btn btn-success" style="width:100%">Save Paycheck</button>
    </form>
  </div>
</div>

<div class="modal" id="expenseModal">
  <div class="modal-content">
    <div class="modal-header"><h2>Add Expense</h2><button class="close-btn" onclick="closeModal('expenseModal')">&times;</button></div>
    <form id="expenseForm">
      <div class="form-group"><label>Description</label><input type="text" id="eDesc" required placeholder="e.g. Textbooks"></div>
      <div class="form-row">
        <div class="form-group"><label>Amount ($)</label><input type="number" id="eAmount" required min="0" step="0.01" placeholder="0.00"></div>
        <div class="form-group"><label>Category</label>
          <select id="eCat" required>
            <option value="food">🍔 Food</option><option value="books">📚 Books</option><option value="transport">🚗 Transport</option>
            <option value="entertainment">🎮 Entertainment</option><option value="supplies">✏️ Supplies</option>
            <option value="rent">🏠 Rent</option><option value="other">📦 Other</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label>Date</label><input type="date" id="eDate" required></div>
      <button type="submit" class="btn btn-primary" style="width:100%">Add Expense</button>
    </form>
  </div>
</div>

<div class="modal" id="fileNameModal">
  <div class="modal-content" style="max-width:400px">
    <div class="modal-header"><h2>Name Your File</h2><button class="close-btn" onclick="closeModal('fileNameModal')">&times;</button></div>
    <form id="fileNameForm">
      <div class="form-group"><label>Custom Name / Summary</label><input type="text" id="customFileName" required placeholder="e.g. Chapter 3 Notes"></div>
      <p style="font-size:.85rem;color:var(--gray);margin-bottom:15px">This label will be shown in your notes list.</p>
      <button type="submit" class="btn btn-primary" style="width:100%">Save File</button>
    </form>
  </div>
</div>

<script>
// ═══════════════════════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════════════════════
let D = {
  student:{name:'',semester:''},
  courses:[],assignments:[],projects:[],schedule:[],
  expenses:[],paychecks:[],studyLog:[],
  weekNotes:{},budget:0,
  gcData:{} // {courseId or 'scratch': [{id,name,type,weight,score,outOf}]}
};

const COLORS=['linear-gradient(135deg,#6366f1,#8b5cf6)','linear-gradient(135deg,#10b981,#059669)',
  'linear-gradient(135deg,#f59e0b,#d97706)','linear-gradient(135deg,#ef4444,#dc2626)',
  'linear-gradient(135deg,#3b82f6,#2563eb)','linear-gradient(135deg,#ec4899,#db2777)',
  'linear-gradient(135deg,#14b8a6,#0d9488)','linear-gradient(135deg,#f97316,#ea580c)'];
const SOLID=['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316'];
const MEMBER_COLORS=['#6366f1','#10b981','#f59e0b','#ef4444','#3b82f6','#ec4899','#14b8a6','#f97316','#8b5cf6','#06b6d4'];
const ROLES=['Member','Leader','Developer','Designer','Researcher','Writer','Editor','Presenter','Tester','Other'];

let tempFile=null,uploadCourseId=null,uploadWeek=null;
let currentGCKey='scratch'; // which course/key is loaded in GC

function migrateProjects(p){
  return(p||[]).map(x=>({...x,subtasks:Array.isArray(x.subtasks)?x.subtasks:[],members:Array.isArray(x.members)?x.members:[],log:Array.isArray(x.log)?x.log:[]}));
}

function save(){
  D.student.name=el('studentName').value;
  D.student.semester=el('semester').value;
  localStorage.setItem('UT5',JSON.stringify(D));
}
function load(){
  const s=localStorage.getItem('UT5');
  if(s){
    const p=JSON.parse(s);D={...D,...p};
    D.projects=migrateProjects(D.projects);
    if(!D.weekNotes)D.weekNotes={};
    if(!D.paychecks)D.paychecks=[];
    if(!D.gcData)D.gcData={};
    el('studentName').value=D.student.name||'';
    el('semester').value=D.student.semester||'';
    el('budgetInput').value=D.budget||'';
  }
}
function el(id){return document.getElementById(id);}
function uid(){return Date.now()+Math.floor(Math.random()*99999);}
function pad(n){return String(n).padStart(2,'0');}

// ═══ NAV ═══
document.querySelectorAll('.nav-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');el(b.dataset.tab).classList.add('active');
  if(b.dataset.tab==='dashboard')renderDashboard();
  if(b.dataset.tab==='timer')refreshTimerCourses();
  if(b.dataset.tab==='gradecalc')initGC();
}));
document.querySelectorAll('.inner-tab').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.inner-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.inner-panel').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');el(b.dataset.panel).classList.add('active');
}));
document.querySelectorAll('.gc-tab').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.gc-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.gc-panel').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');el(b.dataset.gcpanel).classList.add('active');
  if(b.dataset.gcpanel==='gc-whatif')renderWhatIf();
  if(b.dataset.gcpanel==='gc-needed')calcNeeded();
}));

// ═══ MODALS ═══
function openModal(id){
  el(id).classList.add('active');
  if(id==='assignModal'||id==='schedModal'||id==='projectModal')fillCourseSelects();
}
function closeModal(id){el(id).classList.remove('active');}
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('active');}));
function fillCourseSelects(){
  ['aCourse','sCourse','pCourse'].forEach(id=>{
    const s=el(id);if(!s)return;const v=s.value;
    const blank=id==='pCourse'?'<option value="">Not linked</option>':'<option value="">Select course</option>';
    s.innerHTML=blank+D.courses.map(c=>`<option value="${c.id}">${c.name} (${c.code})</option>`).join('');
    if(v)s.value=v;
  });
}

// ═══ COURSES ═══
function openCourseModal(){el('courseModalTitle').textContent='Add Course';el('cEditId').value='';el('courseForm').reset();el('courseModal').classList.add('active');}
function closeCourseModal(){el('courseModal').classList.remove('active');el('cEditId').value='';el('courseForm').reset();}
el('courseForm').addEventListener('submit',e=>{
  e.preventDefault();
  const editId=el('cEditId').value;
  const data={name:el('cName').value.trim(),code:el('cCode').value.trim(),credits:parseInt(el('cCredits').value),instructor:el('cInstructor').value.trim(),grade:el('cGrade').value};
  if(editId){const idx=D.courses.findIndex(c=>String(c.id)===editId);if(idx>-1)D.courses[idx]={...D.courses[idx],...data};}
  else{const id=uid();D.courses.push({id,...data});D.weekNotes[id]={};}
  save();renderCourses();updateGPA();renderDashboard();closeCourseModal();
});
function editCourse(id){
  const c=D.courses.find(x=>x.id===id);if(!c)return;
  el('courseModalTitle').textContent='Edit Course';el('cEditId').value=String(c.id);
  el('cName').value=c.name;el('cCode').value=c.code;el('cCredits').value=c.credits;
  el('cInstructor').value=c.instructor||'';el('cGrade').value=c.grade||'';
  el('courseModal').classList.add('active');
}
function deleteCourse(id){
  if(!confirm('Delete course and all linked data?'))return;
  D.courses=D.courses.filter(c=>c.id!==id);D.assignments=D.assignments.filter(a=>a.courseId!==id);
  D.schedule=D.schedule.filter(s=>s.courseId!==id);D.projects=D.projects.filter(p=>p.courseId!=id);
  delete D.weekNotes[id];delete D.gcData[id];
  save();renderCourses();renderAssignments();renderSchedule();renderProjects();updateGPA();renderDashboard();
}
function renderCourses(){
  const container=el('courseList');
  if(!D.courses.length){container.innerHTML='<div class="empty"><div class="ei">📚</div><p>No courses yet</p></div>';return;}
  container.innerHTML=D.courses.map((c,i)=>{
    const gl=c.grade?gradeLetter(parseFloat(c.grade)):'-';
    const linked=D.assignments.filter(a=>a.courseId==c.id);
    const assignHTML=linked.length?linked.map(a=>{
      const dc=getDueClass(a.dueDate,a.completed);
      const dot=a.completed?'#10b981':dc==='urgent'?'#ef4444':dc==='soon'?'#f59e0b':'#a5b4fc';
      return`<div class="mini-assignment" onclick="jumpToAssignment(${a.id})"><div class="ma-dot" style="background:${dot}"></div><span class="ma-title">${a.title}</span><span class="ma-due">${a.completed?'✅ Done':getDaysUntil(a.dueDate)}</span></div>`;
    }).join(''):'<p style="opacity:.7;font-size:.78rem">No assignments linked yet</p>';
    return`<div class="course-card" style="background:${COLORS[i%COLORS.length]}">
      <h3>${c.name}</h3><div class="code">${c.code}</div><div class="grade-badge">${gl}</div>
      <div class="details"><span>👤 ${c.instructor||'TBA'}</span><span>📊 ${c.credits} Credits</span></div>
      <div class="week-notes-section"><h4>📂 Weekly Notes</h4>
        <div class="week-selector">
          <select id="wkSel_${c.id}" onchange="renderWeekFiles(${c.id})">
            ${Array.from({length:12},(_,k)=>`<option value="week${k+1}">Week ${k+1}</option>`).join('')}
          </select>
          <button class="cc-btn" onclick="initiateUpload(${c.id})">📤 Upload</button>
          <input type="file" id="wf_${c.id}" class="week-upload-input" onchange="onFileSelected(this)">
        </div>
        <div id="wkFiles_${c.id}">${renderWeekFilesHTML(c.id,'week1')}</div>
      </div>
      <div class="course-assignments"><h4>📝 Assignments (${linked.length})</h4>${assignHTML}
        <button class="cc-btn" style="margin-top:8px;width:100%" onclick="quickAddAssign(${c.id})">+ Quick Add</button>
      </div>
      <div class="actions">
        <button class="cc-btn" onclick="editCourse(${c.id})">✏️ Edit</button>
        <button class="cc-btn" onclick="deleteCourse(${c.id})">🗑️ Delete</button>
        <button class="cc-btn" onclick="openGCForCourse(${c.id})">🧮 Grade Calc</button>
      </div>
    </div>`;
  }).join('');
}
function renderWeekFilesHTML(courseId,week){
  const notes=(D.weekNotes[courseId]||{})[week]||[];
  if(!notes.length)return`<p style="opacity:.7;font-size:.75rem;padding:4px 0">No files for ${week.replace('week','Week ')}</p>`;
  return notes.map((n,i)=>`<div class="note-file"><span>📄</span><a href="${n.dataUrl}" download="${n.name}">${n.name}</a><button class="del-note" onclick="deleteWeekFile(${courseId},'${week}',${i})">✕</button></div>`).join('');
}
function renderWeekFiles(courseId){const s=el(`wkSel_${courseId}`);const week=s?s.value:'week1';const c=el(`wkFiles_${courseId}`);if(c)c.innerHTML=renderWeekFilesHTML(courseId,week);}
function initiateUpload(courseId){const s=el(`wkSel_${courseId}`);uploadCourseId=courseId;uploadWeek=s?s.value:'week1';el(`wf_${courseId}`).click();}
function onFileSelected(input){if(!input.files.length)return;tempFile=input.files[0];el('customFileName').value=tempFile.name.replace(/\.[^.]+$/,'');openModal('fileNameModal');input.value='';}
el('fileNameForm').addEventListener('submit',e=>{
  e.preventDefault();if(!tempFile||!uploadCourseId)return;
  const name=el('customFileName').value.trim()||tempFile.name;
  const reader=new FileReader();
  reader.onload=ev=>{
    if(!D.weekNotes[uploadCourseId])D.weekNotes[uploadCourseId]={};
    if(!D.weekNotes[uploadCourseId][uploadWeek])D.weekNotes[uploadCourseId][uploadWeek]=[];
    D.weekNotes[uploadCourseId][uploadWeek].push({name,type:tempFile.type,dataUrl:ev.target.result,uploadedAt:new Date().toISOString()});
    save();renderWeekFiles(uploadCourseId);closeModal('fileNameModal');tempFile=null;uploadCourseId=null;uploadWeek=null;
  };reader.readAsDataURL(tempFile);
});
function deleteWeekFile(courseId,week,idx){if(!confirm('Delete?'))return;D.weekNotes[courseId][week].splice(idx,1);save();renderWeekFiles(courseId);}
function gradeLetter(p){if(p>=4.0)return'A';if(p>=3.7)return'A-';if(p>=3.3)return'B+';if(p>=3.0)return'B';if(p>=2.7)return'B-';if(p>=2.3)return'C+';if(p>=2.0)return'C';if(p>=1.7)return'C-';if(p>=1.3)return'D+';if(p>=1.0)return'D';return'F';}
function quickAddAssign(courseId){fillCourseSelects();el('aCourse').value=courseId;openModal('assignModal');}
function jumpToAssignment(id){
  document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
  document.querySelector('[data-tab="assignments"]').classList.add('active');el('assignments').classList.add('active');
  document.querySelectorAll('.inner-tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.inner-panel').forEach(x=>x.classList.remove('active'));
  document.querySelector('[data-panel="panel-assignments"]').classList.add('active');el('panel-assignments').classList.add('active');
  renderAssignments();
  setTimeout(()=>{const e=el(`assign_${id}`);if(e){e.scrollIntoView({behavior:'smooth',block:'center'});e.style.outline='3px solid var(--primary)';setTimeout(()=>e.style.outline='',2000);}},100);
}
function openGCForCourse(courseId){
  document.querySelectorAll('.nav-btn').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
  document.querySelector('[data-tab="gradecalc"]').classList.add('active');el('gradecalc').classList.add('active');
  initGC();
  el('gcCourseSelect').value=courseId;
  loadGCCourse();
}

// ═══ ASSIGNMENTS ═══
el('assignForm').addEventListener('submit',e=>{
  e.preventDefault();const cid=el('aCourse').value;
  D.assignments.push({id:uid(),title:el('aTitle').value.trim(),courseId:cid?parseInt(cid):null,dueDate:el('aDue').value,priority:el('aPriority').value,type:el('aType').value,weight:parseFloat(el('aWeight').value)||0,notes:el('aNotes').value,completed:false});
  save();renderAssignments();renderCourses();renderDashboard();closeModal('assignModal');e.target.reset();
});
function renderAssignments(filter='all'){
  const container=el('assignmentList');
  let list=[...D.assignments];
  if(filter==='pending')list=list.filter(a=>!a.completed);
  else if(filter==='completed')list=list.filter(a=>a.completed);
  else if(filter==='high')list=list.filter(a=>a.priority==='high');
  list.sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate));
  if(!list.length){container.innerHTML='<div class="empty"><div class="ei">📝</div><p>No assignments found</p></div>';return;}
  const icons={assignment:'📋',quiz:'📝',exam:'📚',project:'🗂️',other:'📌'};
  container.innerHTML=list.map(a=>{
    const course=D.courses.find(c=>c.id==a.courseId);
    const dc=getDueClass(a.dueDate,a.completed);
    const dLabel=a.completed?'✅ Done':getDaysUntil(a.dueDate);
    const dClass=a.completed?'due-done':dc==='urgent'?'due-urgent':dc==='soon'?'due-soon':'due-later';
    const ci=course?D.courses.indexOf(course)%SOLID.length:0;
    return`<div class="assign-item ${a.completed?'done':''}" id="assign_${a.id}">
      <div class="checkbox" onclick="toggleAssign(${a.id})">${a.completed?'✓':''}</div>
      <div class="assign-info"><div class="assign-title">${icons[a.type]||'📋'} ${a.title}</div>
        <div class="assign-meta">${course?`<span style="background:${SOLID[ci]}20;color:${SOLID[ci]};padding:2px 7px;border-radius:10px;font-size:.72rem;font-weight:600">${course.code}</span>`:''} ${a.weight?` • ${a.weight}% weight`:''} ${a.notes?` • ${a.notes}`:''}</div>
      </div>
      <span class="pri pri-${a.priority}">${a.priority}</span>
      <span class="due-badge ${dClass}">${dLabel}</span>
      <button class="btn btn-danger btn-sm" onclick="deleteAssign(${a.id})">🗑️</button>
    </div>`;
  }).join('');
}
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderAssignments(b.dataset.filter);}));
function toggleAssign(id){const a=D.assignments.find(x=>x.id===id);if(a){a.completed=!a.completed;save();renderAssignments();renderCourses();renderDashboard();}}
function deleteAssign(id){D.assignments=D.assignments.filter(a=>a.id!==id);save();renderAssignments();renderCourses();renderDashboard();}
function getDueClass(d,done){if(done)return'done';const diff=Math.ceil((new Date(d)-new Date())/864e5);return diff<=2?'urgent':diff<=7?'soon':'later';}
function getDaysUntil(d){const diff=Math.ceil((new Date(d)-new Date())/864e5);return diff<0?'Overdue':diff===0?'Today':diff===1?'Tomorrow':`${diff} days`;}

// ═══ PROJECTS ═══
function openProjectModal(){fillCourseSelects();openModal('projectModal');}
el('projectForm').addEventListener('submit',e=>{
  e.preventDefault();
  const lines=el('pSubtasks').value.split('\n').filter(l=>l.trim());
  D.projects.push({id:uid(),title:el('pTitle').value.trim(),courseId:el('pCourse').value||null,dueDate:el('pDue').value,status:el('pStatus').value,priority:el('pPriority').value,weight:parseFloat(el('pWeight').value)||0,desc:el('pDesc').value.trim(),subtasks:lines.map(t=>({id:uid(),title:t.trim(),done:false})),members:[],log:[],createdAt:new Date().toISOString()});
  save();renderProjects();renderDashboard();closeModal('projectModal');e.target.reset();
});
function getProject(id){return D.projects.find(p=>p.id===id);}
function renderProjects(){
  const container=el('projectList');
  if(!D.projects.length){container.innerHTML='<div class="empty"><div class="ei">🗂️</div><p>No projects yet</p></div>';return;}
  container.innerHTML=[...D.projects].sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate)).map(p=>buildProjectHTML(p)).join('');
}
function buildProjectHTML(p){
  const subtasks=p.subtasks||[],members=p.members||[],log=p.log||[];
  const course=D.courses.find(c=>c.id==p.courseId);
  const done=subtasks.filter(s=>s.done).length,total=subtasks.length,pct=total>0?Math.round(done/total*100):0;
  const SL={planning:'📋 Planning','in-progress':'🚧 In Progress',completed:'✅ Completed','on-hold':'⏸ On Hold'};
  const SC={planning:'proj-planning','in-progress':'proj-in-progress',completed:'proj-completed','on-hold':'proj-on-hold'};
  const subtasksHTML=subtasks.map(s=>`<div class="subtask-item ${s.done?'st-done':''}" id="st_${p.id}_${s.id}"><div class="st-check" data-proj="${p.id}" data-st="${s.id}" onclick="toggleSubtask(this)">${s.done?'✓':''}</div><span class="st-title">${escHtml(s.title)}</span><button class="st-del" data-proj="${p.id}" data-st="${s.id}" onclick="deleteSubtask(this)">✕</button></div>`).join('');
  const membersHTML=members.map((m,mi)=>{const ini=(m.name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);const col=MEMBER_COLORS[mi%MEMBER_COLORS.length];return`<div class="member-chip"><div class="member-avatar" style="background:${col}">${ini}</div><div class="member-info"><span class="member-name">${escHtml(m.name)}</span><span class="member-role">${escHtml(m.role||'Member')}</span></div>${m.email?`<a href="mailto:${m.email}" style="color:var(--primary);font-size:.75rem">✉</a>`:''}<button class="member-del" data-proj="${p.id}" data-mi="${mi}" onclick="deleteMember(this)">✕</button></div>`;}).join('');
  const logHTML=log.map((l,li)=>`<div class="log-entry"><div class="log-content">${escHtml(l.text)}</div><div class="log-entry-meta"><span class="log-date">${new Date(l.date).toLocaleDateString()}</span><span class="log-date">${new Date(l.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span></div><button class="log-del" data-proj="${p.id}" data-li="${li}" onclick="deleteLogEntry(this)">🗑</button></div>`).join('');
  return`<div class="project-card status-${p.status}" id="proj_${p.id}">
    <div class="project-top"><h3>🗂️ ${escHtml(p.title)}</h3>
      <div class="project-top-right">
        <select class="status-select" data-proj="${p.id}" onchange="changeStatus(this)">
          <option value="planning" ${p.status==='planning'?'selected':''}>📋 Planning</option>
          <option value="in-progress" ${p.status==='in-progress'?'selected':''}>🚧 In Progress</option>
          <option value="on-hold" ${p.status==='on-hold'?'selected':''}>⏸ On Hold</option>
          <option value="completed" ${p.status==='completed'?'selected':''}>✅ Completed</option>
        </select>
        <button class="btn btn-danger btn-sm" onclick="deleteProject(${p.id})">🗑️</button>
      </div>
    </div>
    <div class="proj-meta">
      <span class="proj-badge ${SC[p.status]}">${SL[p.status]}</span>
      <span class="proj-badge" style="background:#f1f5f9;color:var(--gray)">⏰ ${getDaysUntil(p.dueDate)}</span>
      ${course?`<span class="proj-badge" style="background:${SOLID[D.courses.indexOf(course)%SOLID.length]}20;color:${SOLID[D.courses.indexOf(course)%SOLID.length]}">${course.code}</span>`:''}
      ${p.weight?`<span class="proj-badge proj-completed">${p.weight}% of grade</span>`:''}
      <span class="pri pri-${p.priority}">${p.priority}</span>
    </div>
    ${p.desc?`<p class="project-desc">${escHtml(p.desc)}</p>`:''}
    <div class="prog-bar-wrap"><div class="prog-bar-fill" style="width:${pct}%"></div></div>
    <p class="prog-text">${done}/${total} subtasks complete — ${pct}%</p>
    <div class="subtasks-section"><h4>✅ Subtasks</h4><div id="sts_${p.id}">${subtasksHTML}</div>
      <div class="add-subtask-row"><input type="text" id="newST_${p.id}" placeholder="Add subtask…" onkeydown="if(event.key==='Enter'){event.preventDefault();addSubtask(${p.id});}"><button class="btn btn-primary btn-sm" onclick="addSubtask(${p.id})">+ Add</button></div>
    </div>
    <div class="members-section"><h4>👥 Group Members (${members.length})</h4>
      <div class="member-list" id="members_${p.id}">${membersHTML||'<p style="color:var(--gray);font-size:.83rem">No members added yet</p>'}</div>
      <div class="add-member-row"><input type="text" id="mName_${p.id}" placeholder="Full name *"><select id="mRole_${p.id}">${ROLES.map(r=>`<option>${r}</option>`).join('')}</select><button class="btn btn-primary btn-sm" onclick="addMember(${p.id})">+ Add</button></div>
      <div style="margin-top:6px"><input type="email" id="mEmail_${p.id}" placeholder="Email (optional)" style="width:100%;padding:8px 10px;border:2px solid #e2e8f0;border-radius:8px;font-size:.85rem;"></div>
    </div>
    <div class="project-log-section"><h4>📝 Project Log (${log.length})</h4>
      <div class="log-entries" id="log_${p.id}">${logHTML||'<p style="color:var(--gray);font-size:.83rem">No entries yet</p>'}</div>
      <div class="log-input-row"><textarea id="logTxt_${p.id}" placeholder="Write an update…"></textarea><button class="log-post-btn" onclick="addLogEntry(${p.id})">Post</button></div>
    </div>
  </div>`;
}
function escHtml(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function changeStatus(sel){const id=parseInt(sel.dataset.proj);const p=getProject(id);if(!p)return;p.status=sel.value;const card=el(`proj_${id}`);if(card)card.className=`project-card status-${p.status}`;save();}
function toggleSubtask(btn){
  const pid=parseInt(btn.dataset.proj),sid=parseInt(btn.dataset.st);const p=getProject(pid);if(!p)return;
  const s=p.subtasks.find(x=>x.id===sid);if(!s)return;s.done=!s.done;
  if(p.subtasks.every(s=>s.done)&&p.subtasks.length>0)p.status='completed';
  else if(p.subtasks.some(s=>s.done)&&p.status==='planning')p.status='in-progress';
  save();
  const item=el(`st_${pid}_${sid}`);if(item){item.classList.toggle('st-done',s.done);item.querySelector('.st-check').textContent=s.done?'✓':'';}
  const done=p.subtasks.filter(x=>x.done).length,total=p.subtasks.length,pct=total>0?Math.round(done/total*100):0;
  const card=el(`proj_${pid}`);if(card){const bar=card.querySelector('.prog-bar-fill');if(bar)bar.style.width=pct+'%';const txt=card.querySelector('.prog-text');if(txt)txt.textContent=`${done}/${total} subtasks complete — ${pct}%`;card.className=`project-card status-${p.status}`;const sel=card.querySelector('.status-select');if(sel)sel.value=p.status;}
}
function deleteSubtask(btn){const pid=parseInt(btn.dataset.proj),sid=parseInt(btn.dataset.st);const p=getProject(pid);if(!p)return;p.subtasks=p.subtasks.filter(s=>s.id!==sid);save();const item=el(`st_${pid}_${sid}`);if(item)item.remove();const done=p.subtasks.filter(s=>s.done).length,total=p.subtasks.length,pct=total>0?Math.round(done/total*100):0;const card=el(`proj_${pid}`);if(card){const bar=card.querySelector('.prog-bar-fill');if(bar)bar.style.width=pct+'%';const txt=card.querySelector('.prog-text');if(txt)txt.textContent=`${done}/${total} subtasks complete — ${pct}%`;}}
function addSubtask(pid){const input=el(`newST_${pid}`);if(!input||!input.value.trim())return;const p=getProject(pid);if(!p)return;const st={id:uid(),title:input.value.trim(),done:false};p.subtasks.push(st);input.value='';save();const c=el(`sts_${pid}`);if(c){const div=document.createElement('div');div.className='subtask-item';div.id=`st_${pid}_${st.id}`;div.innerHTML=`<div class="st-check" data-proj="${pid}" data-st="${st.id}" onclick="toggleSubtask(this)"></div><span class="st-title">${escHtml(st.title)}</span><button class="st-del" data-proj="${pid}" data-st="${st.id}" onclick="deleteSubtask(this)">✕</button>`;c.appendChild(div);}const done=p.subtasks.filter(s=>s.done).length,total=p.subtasks.length,pct=total>0?Math.round(done/total*100):0;const card=el(`proj_${pid}`);if(card){const bar=card.querySelector('.prog-bar-fill');if(bar)bar.style.width=pct+'%';const txt=card.querySelector('.prog-text');if(txt)txt.textContent=`${done}/${total} subtasks complete — ${pct}%`;}}
function addMember(pid){const nameEl=el(`mName_${pid}`);const name=(nameEl?nameEl.value.trim():'');if(!name){alert('Please enter a name.');return;}const role=el(`mRole_${pid}`)?.value||'Member';const email=el(`mEmail_${pid}`)?.value.trim()||'';const p=getProject(pid);if(!p)return;p.members.push({id:uid(),name,role,email});nameEl.value='';if(el(`mEmail_${pid}`))el(`mEmail_${pid}`).value='';save();const c=el(`members_${pid}`);if(c){const mi=p.members.length-1;const m=p.members[mi];const ini=(m.name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);const col=MEMBER_COLORS[mi%MEMBER_COLORS.length];if(c.querySelector('p'))c.innerHTML='';const chip=document.createElement('div');chip.className='member-chip';chip.innerHTML=`<div class="member-avatar" style="background:${col}">${ini}</div><div class="member-info"><span class="member-name">${escHtml(m.name)}</span><span class="member-role">${escHtml(m.role)}</span></div>${m.email?`<a href="mailto:${m.email}" style="color:var(--primary);font-size:.75rem">✉</a>`:''}<button class="member-del" data-proj="${pid}" data-mi="${mi}" onclick="deleteMember(this)">✕</button>`;c.appendChild(chip);const h=el(`proj_${pid}`)?.querySelector('.members-section h4');if(h)h.textContent=`👥 Group Members (${p.members.length})`;}}
function deleteMember(btn){const pid=parseInt(btn.dataset.proj),mi=parseInt(btn.dataset.mi);const p=getProject(pid);if(!p)return;p.members.splice(mi,1);save();const c=el(`members_${pid}`);if(!c)return;if(!p.members.length){c.innerHTML='<p style="color:var(--gray);font-size:.83rem">No members added yet</p>';}else{c.innerHTML=p.members.map((m,i)=>{const ini=(m.name||'?').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);const col=MEMBER_COLORS[i%MEMBER_COLORS.length];return`<div class="member-chip"><div class="member-avatar" style="background:${col}">${ini}</div><div class="member-info"><span class="member-name">${escHtml(m.name)}</span><span class="member-role">${escHtml(m.role)}</span></div>${m.email?`<a href="mailto:${m.email}" style="color:var(--primary);font-size:.75rem">✉</a>`:''}<button class="member-del" data-proj="${pid}" data-mi="${i}" onclick="deleteMember(this)">✕</button></div>`;}).join('');}const h=el(`proj_${pid}`)?.querySelector('.members-section h4');if(h)h.textContent=`👥 Group Members (${p.members.length})`;}
function addLogEntry(pid){const txtEl=el(`logTxt_${pid}`);if(!txtEl||!txtEl.value.trim())return;const p=getProject(pid);if(!p)return;const entry={id:uid(),text:txtEl.value.trim(),date:new Date().toISOString()};p.log.push(entry);txtEl.value='';save();const c=el(`log_${pid}`);if(c){const li=p.log.length-1;if(c.querySelector('p'))c.innerHTML='';const div=document.createElement('div');div.className='log-entry';div.innerHTML=`<div class="log-content">${escHtml(entry.text)}</div><div class="log-entry-meta"><span class="log-date">${new Date(entry.date).toLocaleDateString()}</span><span class="log-date">${new Date(entry.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span></div><button class="log-del" data-proj="${pid}" data-li="${li}" onclick="deleteLogEntry(this)">🗑</button>`;c.appendChild(div);c.scrollTop=c.scrollHeight;const h=el(`proj_${pid}`)?.querySelector('.project-log-section h4');if(h)h.textContent=`📝 Project Log (${p.log.length})`;}}
function deleteLogEntry(btn){const pid=parseInt(btn.dataset.proj),li=parseInt(btn.dataset.li);const p=getProject(pid);if(!p)return;p.log.splice(li,1);save();const c=el(`log_${pid}`);if(!c)return;if(!p.log.length){c.innerHTML='<p style="color:var(--gray);font-size:.83rem">No entries yet</p>';}else{c.innerHTML=p.log.map((l,i)=>`<div class="log-entry"><div class="log-content">${escHtml(l.text)}</div><div class="log-entry-meta"><span class="log-date">${new Date(l.date).toLocaleDateString()}</span><span class="log-date">${new Date(l.date).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span></div><button class="log-del" data-proj="${pid}" data-li="${i}" onclick="deleteLogEntry(this)">🗑</button></div>`).join('');}const h=el(`proj_${pid}`)?.querySelector('.project-log-section h4');if(h)h.textContent=`📝 Project Log (${p.log.length})`;}
function deleteProject(id){if(!confirm('Delete project?'))return;D.projects=D.projects.filter(p=>p.id!==id);save();renderProjects();}

// ═══ SCHEDULE ═══
el('schedForm').addEventListener('submit',e=>{e.preventDefault();D.schedule.push({id:uid(),courseId:parseInt(el('sCourse').value),day:el('sDay').value,startTime:el('sStart').value,endTime:el('sEnd').value,location:el('sLoc').value});save();renderSchedule();closeModal('schedModal');e.target.reset();});
function renderSchedule(){['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].forEach(day=>{const container=document.querySelector(`.dc[data-day="${day}"]`);const items=D.schedule.filter(s=>s.day===day).sort((a,b)=>a.startTime.localeCompare(b.startTime));container.innerHTML=items.map(item=>{const c=D.courses.find(x=>x.id===item.courseId);return`<div class="sched-item"><button class="si-del" onclick="delSched(${item.id})">✕</button><div class="si-time">${fmtTime(item.startTime)}–${fmtTime(item.endTime)}</div><div class="si-name">${c?c.name:'Unknown'}</div><div class="si-loc">📍 ${item.location||'TBA'}</div></div>`;}).join('');});}
function delSched(id){D.schedule=D.schedule.filter(s=>s.id!==id);save();renderSchedule();}
function fmtTime(t){const[h,m]=t.split(':');const hr=parseInt(h);return`${hr%12||12}:${m} ${hr>=12?'PM':'AM'}`;}

// ═══ GPA ═══
function updateGPA(){
  const tbody=document.querySelector('#gpaTable tbody');const graded=D.courses.filter(c=>c.grade);
  if(!graded.length){tbody.innerHTML='<tr><td colspan="4" style="text-align:center;color:var(--gray)">No graded courses yet</td></tr>';el('calcGPA').textContent='0.00';el('totalCr').textContent='0';return;}
  let tp=0,tc=0;tbody.innerHTML=graded.map(c=>{const p=parseFloat(c.grade);tp+=p*c.credits;tc+=c.credits;return`<tr><td>${c.name}</td><td>${c.credits}</td><td>${gradeLetter(p)}</td><td>${p.toFixed(1)}</td></tr>`;}).join('');
  const gpa=tc>0?(tp/tc).toFixed(2):'0.00';el('calcGPA').textContent=gpa;el('totalCr').textContent=tc;el('dashGPA').textContent=gpa;
}

// ═══════════════════════════════════════════════════════════
//  GRADE CALCULATOR
// ═══════════════════════════════════════════════════════════

function initGC(){
  // Populate course dropdown
  const s=el('gcCourseSelect');
  const v=s.value;
  s.innerHTML='<option value="">— Select a course or start fresh —</option>'+D.courses.map(c=>`<option value="${c.id}">${c.name} (${c.code})</option>`).join('');
  if(v)s.value=v;
  // Load current key
  renderAssessmentTable();
  updateGCStats();
}

function loadGCCourse(){
  const cid=el('gcCourseSelect').value;
  currentGCKey=cid||'scratch';
  // Auto-import from assignments if not already set up
  if(cid&&(!D.gcData[cid]||D.gcData[cid].length===0)){
    const linked=D.assignments.filter(a=>a.courseId==cid&&a.weight>0);
    D.gcData[cid]=linked.map(a=>({
      id:uid(),name:a.title,
      type:a.type||'assignment',
      weight:a.weight,
      score:'',outOf:100
    }));
    save();
  }
  if(!D.gcData[currentGCKey])D.gcData[currentGCKey]=[];
  renderAssessmentTable();
  updateGCStats();
}

function clearGC(){
  if(!confirm('Clear all assessments for this calculator?'))return;
  D.gcData[currentGCKey]=[];save();renderAssessmentTable();updateGCStats();
}

function getRows(){return D.gcData[currentGCKey]||[];}

function addAssessmentRow(){
  if(!D.gcData[currentGCKey])D.gcData[currentGCKey]=[];
  D.gcData[currentGCKey].push({id:uid(),name:'New Assessment',type:'assignment',weight:0,score:'',outOf:100});
  save();renderAssessmentTable();updateGCStats();
}

function deleteAssessmentRow(rowId){
  D.gcData[currentGCKey]=D.gcData[currentGCKey].filter(r=>r.id!==rowId);
  save();renderAssessmentTable();updateGCStats();
}

function renderAssessmentTable(){
  const tbody=el('assessmentBody');
  const rows=getRows();
  if(!rows.length){
    tbody.innerHTML=`<tr><td colspan="7" style="text-align:center;color:var(--gray);padding:30px">No assessments yet. Click "+ Add Assessment" to start, or select a course above to auto-import.</td></tr>`;
    return;
  }
  const types=['assignment','quiz','exam','project','participation','lab','other'];
  tbody.innerHTML=rows.map(r=>{
    const hasScore=r.score!==''&&r.score!==null&&!isNaN(parseFloat(r.score));
    const earnedPct=hasScore?((parseFloat(r.score)/r.outOf)*100).toFixed(1):'—';
    const earnedColor=hasScore?(parseFloat(earnedPct)>=70?'var(--secondary)':parseFloat(earnedPct)>=50?'var(--warning)':'var(--danger)'):'var(--gray)';
    return`<tr>
      <td><input type="text" value="${escHtml(r.name)}" onchange="updateRow(${r.id},'name',this.value)" style="min-width:140px"></td>
      <td>
        <select onchange="updateRow(${r.id},'type',this.value)" style="padding:8px;border:2px solid #e2e8f0;border-radius:7px;font-size:.85rem;background:#fff">
          ${types.map(t=>`<option value="${t}" ${r.type===t?'selected':''}>${t.charAt(0).toUpperCase()+t.slice(1)}</option>`).join('')}
        </select>
      </td>
      <td><input type="number" class="${r.weight>0?'scored':''}" value="${r.weight}" min="0" max="100" onchange="updateRow(${r.id},'weight',parseFloat(this.value)||0)">%</td>
      <td><input type="number" class="${hasScore?'scored':'unscored'}" value="${hasScore?r.score:''}" placeholder="—" min="0" onchange="updateRow(${r.id},'score',this.value===''?'':parseFloat(this.value))"></td>
      <td><input type="number" class="scored" value="${r.outOf}" min="1" onchange="updateRow(${r.id},'outOf',parseFloat(this.value)||100)"></td>
      <td><span style="color:${earnedColor};font-weight:700">${hasScore?earnedPct+'%':'—'}</span></td>
      <td><button class="row-del" onclick="deleteAssessmentRow(${r.id})">🗑</button></td>
    </tr>`;
  }).join('');
}

function updateRow(rowId,field,value){
  const rows=D.gcData[currentGCKey];if(!rows)return;
  const row=rows.find(r=>r.id===rowId);if(!row)return;
  row[field]=value;
  save();updateGCStats();
  // Lightweight refresh — only re-render if weight or score changed (affects stats)
  if(field==='weight'||field==='score'||field==='outOf'){renderAssessmentTable();updateGCStats();}
}

function calcGCStats(){
  const rows=getRows();
  let totalWeight=0,earnedWeightedPct=0,scoredWeight=0;
  rows.forEach(r=>{
    totalWeight+=r.weight;
    const hasScore=r.score!==''&&r.score!==null&&!isNaN(parseFloat(r.score));
    if(hasScore){
      const pct=(parseFloat(r.score)/r.outOf)*100;
      earnedWeightedPct+=pct*(r.weight/100);
      scoredWeight+=r.weight;
    }
  });
  const unscoredWeight=100-totalWeight;
  // Current grade: weighted average of scored items only (normalised)
  const currentGrade=scoredWeight>0?(earnedWeightedPct/scoredWeight)*100:null;
  // Projected: assume 100% on remaining
  const projectedGrade=earnedWeightedPct+(100-totalWeight);// best case
  // More realistic projected (assume same avg on remaining)
  const avgOnScored=scoredWeight>0?(earnedWeightedPct/scoredWeight):0;
  const realisticProjected=earnedWeightedPct+(avgOnScored*(100-totalWeight)/100)*100;
  return{totalWeight,earnedWeightedPct,scoredWeight,unscoredWeight,currentGrade,projectedGrade,realisticProjected};
}

function updateGCStats(){
  const s=calcGCStats();
  const rows=getRows();
  // Hero cards
  if(s.currentGrade!==null){
    el('gcCurrentGrade').textContent=s.currentGrade.toFixed(1)+'%';
    el('gcCurrentLetter').textContent=pctToLetter(s.currentGrade);
  } else {
    el('gcCurrentGrade').textContent='—';
    el('gcCurrentLetter').textContent='No scores yet';
  }
  if(s.scoredWeight>0){
    el('gcProjected').textContent=s.realisticProjected.toFixed(1)+'%';
    el('gcProjectedLabel').textContent=pctToLetter(s.realisticProjected)+' — based on your avg';
  } else {
    el('gcProjected').textContent='—';
    el('gcProjectedLabel').textContent='Add scores to project';
  }
  el('gcWeightTotal').textContent=s.totalWeight.toFixed(0)+'%';
  const wok=Math.abs(s.totalWeight-100)<0.5;
  el('gcWeightStatus').textContent=wok?'✅ Total = 100%':s.totalWeight>100?'⚠️ Over 100%':'of 100% assigned';
  el('gcUnscored').textContent=Math.max(0,100-s.scoredWeight).toFixed(0)+'%';
  el('gcWeightBar').style.width=Math.min(s.totalWeight,100)+'%';
  el('gcWeightBar').style.background=s.totalWeight>100?'var(--danger)':s.totalWeight===100?'var(--secondary)':'var(--primary)';
}

function pctToLetter(pct){
  if(pct>=85)return'HD';if(pct>=75)return'D';if(pct>=65)return'C';
  if(pct>=50)return'P';return'F';
}
function pctToLetterUS(pct){
  if(pct>=93)return'A';if(pct>=90)return'A-';if(pct>=87)return'B+';if(pct>=83)return'B';
  if(pct>=80)return'B-';if(pct>=77)return'C+';if(pct>=73)return'C';if(pct>=70)return'C-';
  if(pct>=67)return'D+';if(pct>=63)return'D';if(pct>=60)return'D-';return'F';
}
function pctColor(pct){return pct>=70?'var(--secondary)':pct>=50?'var(--warning)':'var(--danger)';}

// ── WHAT-IF ──
function renderWhatIf(){
  const rows=getRows();
  const unscored=rows.filter(r=>r.score===''||r.score===null||isNaN(parseFloat(r.score)));
  const container=el('whatifSliders');
  if(!unscored.length){
    container.innerHTML='<p style="color:var(--gray);text-align:center;padding:20px">🎉 All assessments are scored! Nothing left to simulate.</p>';
    el('whatifResult').style.display='none';return;
  }
  // Give each unscored row a slider value if not present
  unscored.forEach(r=>{if(r._whatif===undefined)r._whatif=70;});
  container.innerHTML=unscored.map(r=>`
    <div class="whatif-row">
      <label>${escHtml(r.name)} <span style="font-size:.75rem;color:var(--gray)">(${r.weight}% weight)</span></label>
      <input type="range" class="whatif-slider" min="0" max="100" step="1" value="${r._whatif||70}"
        oninput="updateWhatIf(${r.id},this.value)" id="wi_${r.id}">
      <div class="whatif-value" id="wiv_${r.id}">${r._whatif||70}%</div>
    </div>`).join('');
  calcWhatIf();
}

function updateWhatIf(rowId,val){
  const rows=D.gcData[currentGCKey];if(!rows)return;
  const row=rows.find(r=>r.id===rowId);if(!row)return;
  row._whatif=parseFloat(val);
  el(`wiv_${rowId}`).textContent=val+'%';
  calcWhatIf();
}

function calcWhatIf(){
  const rows=getRows();
  let total=0;
  rows.forEach(r=>{
    const hasScore=r.score!==''&&r.score!==null&&!isNaN(parseFloat(r.score));
    const pct=hasScore?(parseFloat(r.score)/r.outOf)*100:(r._whatif||70);
    total+=pct*(r.weight/100);
  });
  const weightTotal=rows.reduce((s,r)=>s+r.weight,0);
  const finalPct=weightTotal>0?total/(weightTotal/100):0;
  const resEl=el('whatifResult');
  resEl.style.display='block';
  el('wiGrade').textContent=finalPct.toFixed(1)+'%';
  el('wiGrade').style.color=pctColor(finalPct);
  el('wiLabel').textContent=`Projected final: ${pctToLetterUS(finalPct)} / ${pctToLetter(finalPct)}`;
  let msg='',cls='';
  if(finalPct>=85){msg='🏆 Excellent! You\'re on track for a High Distinction.';cls='msg-great';}
  else if(finalPct>=70){msg='✅ Good work! Aiming for a solid pass. Keep it up.';cls='msg-ok';}
  else if(finalPct>=50){msg='⚠️ You\'re just passing. Try to push up your remaining scores.';cls='msg-hard';}
  else{msg='❌ Currently projected to fail. Focus on high-weight assessments.';cls='msg-impossible';}
  el('wiMessage').textContent=msg;el('wiMessage').className='wr-message '+cls;
}

// ── WHAT DO I NEED ──
function calcNeeded(){
  const target=parseFloat(el('targetGrade').value)||70;
  const rows=getRows();
  const container=el('neededResults');
  if(!rows.length){container.innerHTML='<p style="color:var(--gray)">Add assessments first.</p>';return;}
  // Already earned
  let alreadyEarned=0,scoredWeight=0,totalWeight=0;
  rows.forEach(r=>{
    totalWeight+=r.weight;
    const hasScore=r.score!==''&&r.score!==null&&!isNaN(parseFloat(r.score));
    if(hasScore){const pct=(parseFloat(r.score)/r.outOf)*100;alreadyEarned+=pct*(r.weight/100);scoredWeight+=r.weight;}
  });
  const remainingWeight=totalWeight-scoredWeight;
  const needed=remainingWeight>0?((target-alreadyEarned)/(remainingWeight/100)):null;
  const unscored=rows.filter(r=>r.score===''||r.score===null||isNaN(parseFloat(r.score)));
  const scored=rows.filter(r=>!(r.score===''||r.score===null||isNaN(parseFloat(r.score))));
  let html='';
  // Summary banner
  if(scored.length){
    const currentPct=scoredWeight>0?(alreadyEarned/scoredWeight)*100:0;
    html+=`<div style="background:#f8fafc;border-radius:12px;padding:18px;margin-bottom:20px;display:flex;gap:20px;flex-wrap:wrap;align-items:center">
      <div style="text-align:center"><div style="font-size:1.8rem;font-weight:700;color:${pctColor(currentPct)}">${currentPct.toFixed(1)}%</div><div style="font-size:.78rem;color:var(--gray)">Current grade</div></div>
      <div style="font-size:1.4rem;color:var(--gray)">→</div>
      <div style="text-align:center"><div style="font-size:1.8rem;font-weight:700;color:var(--primary)">${target}%</div><div style="font-size:.78rem;color:var(--gray)">Target grade</div></div>
      <div style="flex:1;min-width:160px"><div style="font-size:.85rem;color:var(--gray);margin-bottom:6px">Already earned: <strong>${alreadyEarned.toFixed(1)} weighted pts</strong></div>
      <div style="font-size:.85rem;color:var(--gray)">Remaining weight: <strong>${remainingWeight.toFixed(0)}%</strong></div></div>
    </div>`;
  }
  if(!unscored.length){
    const finalPct=scoredWeight>0?(alreadyEarned/(totalWeight/100)):0;
    html+=`<div class="whatif-result" style="display:block"><div class="wr-grade" style="color:${pctColor(finalPct)}">${finalPct.toFixed(1)}%</div><div class="wr-label">All assessments scored — final grade</div>
      <div class="wr-message ${finalPct>=target?'msg-great':'msg-hard'}">${finalPct>=target?'🎉 You have already achieved your target!':'😟 Your final grade is below target. Review your assessments.'}</div></div>`;
    container.innerHTML=html;return;
  }
  if(needed===null){container.innerHTML=html+'<p style="color:var(--gray)">No remaining assessments found.</p>';return;}
  // Overall needed %
  const feasible=needed<=100&&needed>=0;
  html+=`<div class="whatif-result" style="display:block;margin-bottom:20px">
    <div class="wr-grade" style="color:${needed>100?'var(--danger)':needed>70?'var(--warning)':'var(--secondary)'}">
      ${needed>100?'100%+':needed<0?'Already achieved!':needed.toFixed(1)+'%'}
    </div>
    <div class="wr-label">Average score needed on remaining assessments</div>
    <div class="wr-message ${needed>100?'msg-impossible':needed>70?'msg-hard':'msg-great'}">
      ${needed<0?'🎉 You\'ve already surpassed your target! Maintain your current work.':needed>100?`❌ Even 100% on everything won\'t reach ${target}%. Consider adjusting your target.`:needed>85?`⚠️ Challenging — you need high scores (${needed.toFixed(1)}%) on all remaining items.`:`✅ Achievable! Aim for ${needed.toFixed(1)}% average on remaining assessments.`}
    </div>
  </div>`;
  // Per-assessment breakdown
  html+=`<h4 style="color:var(--dark);margin-bottom:12px">Per-Assessment Breakdown</h4>
  <table class="needed-table"><thead><tr><th>Assessment</th><th>Weight</th><th>Need to score</th><th>Out of ${100}</th><th>Difficulty</th></tr></thead><tbody>
  ${unscored.map(r=>{
    const n=needed;
    const raw=(n/100)*r.outOf;
    const diff=n>90?'🔴 Very Hard':n>75?'🟡 Hard':n>50?'🟢 Achievable':'🟢 Easy';
    return`<tr>
      <td style="font-weight:600">${escHtml(r.name)}</td>
      <td><span class="weight-badge">${r.weight}%</span></td>
      <td style="font-weight:700;color:${pctColor(n)}">${n>100?'>100%':n<0?'N/A':n.toFixed(1)+'%'}</td>
      <td style="color:var(--gray)">${n>100?`>${r.outOf}`:n<0?'N/A':Math.ceil(raw)+' / '+r.outOf}</td>
      <td>${diff}</td>
    </tr>`;
  }).join('')}
  </tbody></table>`;
  // Scored summary
  if(scored.length){
    html+=`<h4 style="color:var(--dark);margin:18px 0 12px">✅ Already Scored</h4>
    <table class="needed-table"><thead><tr><th>Assessment</th><th>Weight</th><th>Score</th><th>Earned %</th></tr></thead><tbody>
    ${scored.map(r=>{const pct=(parseFloat(r.score)/r.outOf)*100;return`<tr><td>${escHtml(r.name)}</td><td><span class="weight-badge">${r.weight}%</span></td><td>${r.score}/${r.outOf}</td><td style="font-weight:700;color:${pctColor(pct)}">${pct.toFixed(1)}%</td></tr>`;}).join('')}
    </tbody></table>`;
  }
  container.innerHTML=html;
}

// ═══ TIMER ═══
let tSecs=25*60,tInit=25*60,tRunning=false,tInterval=null;
function showTimer(){const h=Math.floor(tSecs/3600),m=Math.floor((tSecs%3600)/60),s=tSecs%60;el('timerDisplay').textContent=h>0?`${h}:${pad(m)}:${pad(s)}`:`${pad(m)}:${pad(s)}`;}
document.querySelectorAll('.preset-btn').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.preset-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(b.dataset.min==='custom'){el('customRow').style.display='flex';}else{el('customRow').style.display='none';tSecs=parseInt(b.dataset.min)*60;tInit=tSecs;showTimer();if(tRunning){clearInterval(tInterval);tRunning=false;}}}));
el('setCustom').addEventListener('click',()=>{const h=parseInt(el('cHours').value)||0,m=parseInt(el('cMins').value)||0,s=parseInt(el('cSecs').value)||0;tSecs=h*3600+m*60+s;tInit=tSecs;if(tSecs<=0){alert('Enter a valid time');return;}showTimer();if(tRunning){clearInterval(tInterval);tRunning=false;}});
el('btnStart').addEventListener('click',()=>{if(!tRunning&&tSecs>0){tRunning=true;tInterval=setInterval(()=>{if(tSecs>0){tSecs--;showTimer();}else{clearInterval(tInterval);tRunning=false;saveSession();beep();alert('⏰ Session complete!');}},1000);}});
el('btnPause').addEventListener('click',()=>{if(tRunning){clearInterval(tInterval);tRunning=false;}});
el('btnReset').addEventListener('click',()=>{clearInterval(tInterval);tRunning=false;tSecs=tInit;showTimer();});
function beep(){try{const a=new(window.AudioContext||window.webkitAudioContext)();[0,.3,.6].forEach(d=>{const o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=880;g.gain.setValueAtTime(.3,a.currentTime+d);g.gain.exponentialRampToValueAtTime(.01,a.currentTime+d+.3);o.start(a.currentTime+d);o.stop(a.currentTime+d+.3);});}catch(e){}}
function saveSession(){D.studyLog.push({id:uid(),subject:el('studySubject').value||'General Study',duration:Math.round(tInit/60),courseId:el('timerCourse').value?parseInt(el('timerCourse').value):null,date:new Date().toISOString()});save();renderLog();tSecs=tInit;showTimer();}
function renderLog(){const container=el('studyLog');if(!D.studyLog.length){container.innerHTML='<div class="empty"><div class="ei">📖</div><p>No sessions yet</p></div>';return;}container.innerHTML=D.studyLog.slice(-20).reverse().map(l=>{const c=l.courseId?D.courses.find(x=>x.id===l.courseId):null;return`<div class="log-item"><span>📚 ${l.subject}${c?' ('+c.code+')':''}</span><span style="color:var(--gray)">${l.duration}m • ${new Date(l.date).toLocaleDateString()}</span></div>`;}).join('');}
function clearLog(){if(confirm('Clear all study logs?')){D.studyLog=[];save();renderLog();renderDashboard();}}
function refreshTimerCourses(){const s=el('timerCourse');const v=s.value;s.innerHTML='<option value="">General</option>'+D.courses.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');if(v)s.value=v;}

// ═══ BUDGET ═══
el('paycheckForm').addEventListener('submit',e=>{e.preventDefault();D.paychecks.push({id:uid(),employer:el('pcEmp').value,gross:parseFloat(el('pcGross').value)||0,net:parseFloat(el('pcNet').value)||0,fedTax:parseFloat(el('pcFed').value)||0,stateTax:parseFloat(el('pcState').value)||0,hours:parseFloat(el('pcHours').value)||0,payDate:el('pcDate').value});save();renderPaychecks();updateBudgetDisplay();closeModal('paycheckModal');e.target.reset();});
el('expenseForm').addEventListener('submit',e=>{e.preventDefault();D.expenses.push({id:uid(),desc:el('eDesc').value,amount:parseFloat(el('eAmount').value),category:el('eCat').value,date:el('eDate').value});save();renderExpenses();updateBudgetDisplay();closeModal('expenseModal');e.target.reset();});
function setBudget(){D.budget=parseFloat(el('budgetInput').value)||0;save();updateBudgetDisplay();}
function updateBudgetDisplay(){const inc=D.paychecks.reduce((s,p)=>s+(p.net||0),0);const exp=D.expenses.reduce((s,e)=>s+e.amount,0);el('budIncome').textContent=`$${inc.toFixed(2)}`;el('budExp').textContent=`$${exp.toFixed(2)}`;el('budRem').textContent=`$${(inc-exp).toFixed(2)}`;el('budSet').textContent=`$${D.budget.toFixed(2)}`;}
function renderPaychecks(){const container=el('paycheckList');if(!D.paychecks.length){container.innerHTML='<div class="empty"><div class="ei">💵</div><p>No paychecks yet</p></div>';return;}container.innerHTML=D.paychecks.slice().reverse().map(p=>`<div class="pc-record"><div class="pr-info"><h4>${p.employer}</h4><span>${p.payDate?new Date(p.payDate).toLocaleDateString():''}${p.hours?' • '+p.hours+'hrs':''}${p.fedTax?' • Tax: $'+p.fedTax.toFixed(2):''}</span></div><div class="pr-amt">$${(p.net||0).toFixed(2)}</div><button class="btn btn-danger btn-sm" onclick="delPC(${p.id})">🗑️</button></div>`).join('');}
function delPC(id){D.paychecks=D.paychecks.filter(p=>p.id!==id);save();renderPaychecks();updateBudgetDisplay();}
function renderExpenses(){const container=el('expenseList');if(!D.expenses.length){container.innerHTML='<div class="empty"><div class="ei">💸</div><p>No expenses yet</p></div>';return;}const icons={food:'🍔',books:'📚',transport:'🚗',entertainment:'🎮',supplies:'✏️',rent:'🏠',other:'📦'};const clrs={food:'#f59e0b',books:'#8b5cf6',transport:'#3b82f6',entertainment:'#ec4899',supplies:'#10b981',rent:'#ef4444',other:'#6b7280'};container.innerHTML=D.expenses.slice().reverse().map(e=>`<div class="exp-item"><div class="exp-cat"><div class="exp-icon" style="background:${clrs[e.category]}20;color:${clrs[e.category]}">${icons[e.category]}</div><div><div style="font-weight:600">${e.desc}</div><div style="font-size:.78rem;color:var(--gray)">${new Date(e.date).toLocaleDateString()} • ${e.category}</div></div></div><div style="display:flex;align-items:center;gap:10px"><span style="font-weight:600;color:var(--danger)">-$${e.amount.toFixed(2)}</span><button class="btn btn-danger btn-sm" onclick="delExp(${e.id})">🗑️</button></div></div>`).join('');}
function delExp(id){D.expenses=D.expenses.filter(e=>e.id!==id);save();renderExpenses();updateBudgetDisplay();}

// ═══ DASHBOARD ═══
function renderDashboard(){
  const graded=D.courses.filter(c=>c.grade);let tp=0,tc=0;graded.forEach(c=>{tp+=parseFloat(c.grade)*c.credits;tc+=c.credits;});
  const gpa=tc>0?(tp/tc).toFixed(2):'0.00';el('dashGPA').textContent=gpa;
  el('dashCourses').textContent=D.courses.length;el('dashCredits').textContent=D.courses.reduce((s,c)=>s+c.credits,0)+' Credits';
  const pending=D.assignments.filter(a=>!a.completed);el('dashTasks').textContent=pending.length;el('dashUrgent').textContent=pending.filter(a=>getDueClass(a.dueDate,false)==='urgent').length+' Due Soon';
  const now=new Date(),wa=new Date(now);wa.setDate(wa.getDate()-7);
  const wm=D.studyLog.filter(l=>new Date(l.date)>=wa).reduce((s,l)=>s+l.duration,0);
  el('dashStudy').textContent=`${Math.floor(wm/60)}h ${wm%60}m`;el('dashSessions').textContent=D.studyLog.filter(l=>new Date(l.date)>=wa).length+' sessions';
  renderUpcoming();renderWeeklyChart();renderGradeChart();renderProductivity();
}
function renderUpcoming(){
  const container=el('upcomingDeadlines');
  const ua=D.assignments.filter(a=>!a.completed).sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate)).slice(0,5);
  const up=D.projects.filter(p=>p.status!=='completed').sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate)).slice(0,3);
  if(!ua.length&&!up.length){container.innerHTML='<div class="empty"><div class="ei">🎉</div><p>Nothing due soon!</p></div>';return;}
  container.innerHTML=[
    ...ua.map(a=>{const c=D.courses.find(x=>x.id==a.courseId);const dc=getDueClass(a.dueDate,false);return`<div class="assign-item"><div class="assign-info"><div class="assign-title">${a.title}</div><div class="assign-meta">${c?c.code:''}</div></div><span class="due-badge ${dc==='urgent'?'due-urgent':dc==='soon'?'due-soon':'due-later'}">${getDaysUntil(a.dueDate)}</span></div>`;}),
    ...up.map(p=>{const d=p.subtasks.filter(s=>s.done).length,t=p.subtasks.length;return`<div class="assign-item" style="border-left:4px solid var(--warning)"><div class="assign-info"><div class="assign-title">🗂️ ${p.title}</div><div class="assign-meta">${d}/${t} subtasks</div></div><span class="due-badge due-soon">${getDaysUntil(p.dueDate)}</span></div>`;})
  ].join('');
}
function renderWeeklyChart(){const container=el('weeklyChart');const days=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];const today=new Date();const wd=[];for(let i=6;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);const ds=d.toISOString().split('T')[0];const mins=D.studyLog.filter(l=>l.date.split('T')[0]===ds).reduce((s,l)=>s+l.duration,0);wd.push({label:days[d.getDay()],val:Math.round(mins/60*10)/10,isToday:i===0});}const max=Math.max(...wd.map(d=>d.val),1);container.innerHTML=`<div class="bar-chart">${wd.map(d=>`<div class="bar-group"><div class="bar" style="height:${d.val/max*100}%;background:${d.isToday?'linear-gradient(180deg,#10b981,#059669)':'linear-gradient(180deg,#6366f1,#8b5cf6)'}"><span class="bv">${d.val}h</span></div><div class="bar-label">${d.label}</div></div>`).join('')}</div><p style="text-align:center;color:var(--gray);font-size:.8rem;margin-top:6px">This week: <strong>${wd.reduce((s,d)=>s+d.val,0).toFixed(1)}h</strong></p>`;}
function renderGradeChart(){const container=el('gradeChart');const graded=D.courses.filter(c=>c.grade);if(!graded.length){container.innerHTML='<div class="empty" style="padding:20px"><p>No graded courses yet</p></div>';return;}container.innerHTML=`<div class="bar-chart">${graded.map((c,i)=>{const gp=parseFloat(c.grade);return`<div class="bar-group"><div class="bar" style="height:${gp/4*100}%;background:${COLORS[i%COLORS.length]}"><span class="bv">${gradeLetter(gp)}</span></div><div class="bar-label">${c.code}</div></div>`;}).join('')}</div>`;}
function renderProductivity(){
  if(!D.studyLog.length){el('prodScore').textContent='0';el('prodScoreLabel').textContent='Start studying to build your score';el('prodScoreBar').style.width='0%';el('prodInsights').innerHTML='<p style="color:var(--gray);font-size:.88rem;text-align:center">Log study sessions with the timer to see insights.</p>';renderHeatmap([]);renderStreak();return;}
  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const dayTotals=Array(7).fill(0),dayCounts=Array(7).fill(0);
  D.studyLog.forEach(l=>{const d=new Date(l.date).getDay();dayTotals[d]+=l.duration;dayCounts[d]++;});
  const dayAvg=dayTotals.map((t,i)=>dayCounts[i]>0?Math.round(t/dayCounts[i]):0);
  const totalMins=D.studyLog.reduce((s,l)=>s+l.duration,0);const avgLen=Math.round(totalMins/D.studyLog.length);
  const bestDayIdx=dayAvg.indexOf(Math.max(...dayAvg));
  const now=new Date();const last30=[];for(let i=29;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);last30.push(d.toISOString().split('T')[0]);}
  const studied=new Set(D.studyLog.map(l=>l.date.split('T')[0]));const cons=Math.round(last30.filter(d=>studied.has(d)).length/30*100);
  const wh=[];for(let w=3;w>=0;w--){const from=new Date(now);from.setDate(from.getDate()-w*7-6);const to=new Date(now);to.setDate(to.getDate()-w*7);wh.push(Math.round(D.studyLog.filter(l=>{const d=new Date(l.date);return d>=from&&d<=to;}).reduce((s,l)=>s+l.duration,0)/60*10)/10);}
  const up=wh[3]>=wh[2];
  let score=0;score+=Math.min(cons*.4,40);score+=Math.min(avgLen/60*20,20);score+=Math.min((totalMins/60)/10*10,20);score+=up?10:0;score+=D.studyLog.length>=20?10:D.studyLog.length/2;score=Math.min(Math.round(score),100);
  const label=score>=85?'🏆 Elite Scholar':score>=70?'⭐ High Achiever':score>=50?'📈 Making Progress':score>=25?'🌱 Building Habits':'🚀 Just Getting Started';
  el('prodScore').textContent=score;el('prodScoreLabel').textContent=label;el('prodScoreBar').style.width=score+'%';
  const gap=dayAvg.map((v,i)=>({v,i})).filter(x=>x.v===0).map(x=>dayNames[x.i]).slice(0,3);
  el('prodInsights').innerHTML=[
    {icon:'🏆',label:'Most Productive Day',value:`${dayNames[bestDayIdx]} (avg ${dayAvg[bestDayIdx]}m)`},
    {icon:'📊',label:'Avg Session Length',value:`${avgLen} minutes`},
    {icon:'📅',label:'Consistency (30 days)',value:`${cons}% of days`},
    {icon:up?'📈':'📉',label:'Weekly Trend',value:up?`↑ ${wh[2]}h → ${wh[3]}h`:`↓ ${wh[2]}h → ${wh[3]}h`},
    ...(gap.length?[{icon:'💡',label:'Study Gap Days',value:gap.join(', ')}]:[]),
    {icon:'⏱️',label:'Total Study Time',value:`${Math.floor(totalMins/60)}h ${totalMins%60}m`}
  ].map(ins=>`<div class="prod-insight"><div class="pi-icon">${ins.icon}</div><div class="pi-info"><div class="pi-label">${ins.label}</div><div class="pi-value">${ins.value}</div></div></div>`).join('');
  renderHeatmap(dayAvg);renderStreak();
}
function renderHeatmap(dayAvg){
  const heatEl=el('dayHeatmap'),graphEl=el('heatmapGraph');const names=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  if(!dayAvg.length)dayAvg=Array(7).fill(0);const max=Math.max(...dayAvg,1);
  heatEl.innerHTML=names.map((name,i)=>{const v=dayAvg[i]||0,pct=v/max;const cls=pct===0?'heat-0':pct<.2?'heat-1':pct<.4?'heat-2':pct<.6?'heat-3':pct<.8?'heat-4':'heat-5';return`<div class="heat-cell ${cls}"><div class="day-name">${name}</div><div class="day-hrs">${v>0?v+'m':'–'}</div></div>`;}).join('');
  graphEl.innerHTML=dayAvg.map((v,i)=>`<div class="bar-group" style="flex:1"><div class="bar" style="height:${(v/max)*100}%;background:${SOLID[i%SOLID.length]}"><span class="bv" style="top:-15px">${v}m</span></div><div class="bar-label">${names[i][0]}</div></div>`).join('');
}
function renderStreak(){let streak=0;const today=new Date();for(let i=0;i<365;i++){const d=new Date(today);d.setDate(d.getDate()-i);const ds=d.toISOString().split('T')[0];if(D.studyLog.some(l=>l.date.split('T')[0]===ds))streak++;else if(i>0)break;}el('streakBadge').textContent=`🔥 ${streak} day${streak!==1?'s':''}`;}

// ═══ INIT ═══
el('studentName').addEventListener('change',save);
el('semester').addEventListener('change',save);
el('eDate').valueAsDate=new Date();
el('pcDate').valueAsDate=new Date();
load();
renderCourses();renderAssignments();renderProjects();renderSchedule();
renderLog();renderExpenses();renderPaychecks();updateBudgetDisplay();updateGPA();renderDashboard();showTimer();
</script>
</body>
</html>
