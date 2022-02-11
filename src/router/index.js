import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView";
import DashboardView from "@/views/DashboardView";
import ProjectView from "@/views/ProjectView";
import ProjectEditorView from "@/views/ProjectEditorView";
import SubmissionView from "@/views/SubmissionView";
import { isLoggedIn } from "@/utils/auth";

const routes = [
  {
    path: "/",
    redirect: "/login",
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    redirect: "/dashboard/project",
    meta: { requiresAuth: true },
    children: [
      {
        path: "project",
        name: "project",
        component: ProjectView,
      },
      {
        path: "submission",
        name: "submission",
        component: SubmissionView,
      },
    ],
  },
  {
    path: "/project/:projectName",
    name: "ProjectEditor",
    component: ProjectEditorView,
    meta: { requiresAuth: true },
  },
  {
    path: "/writer/submittee/:submitteeName",
    name: "About",
    component: LoginView,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/login",
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
