import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // refreshing the auth token
    const { data: { user } } = await supabase.auth.getUser();

    // Rutas públicas que no requieren verificación
    const isPublicRoute = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/register') ||
        request.nextUrl.pathname.startsWith('/forgot-password') ||
        request.nextUrl.pathname === '/reset-password';

    if (user && !isPublicRoute) {
        // Obtenemos el perfil para verificar si debe cambiar la contraseña
        const { data: profile } = await supabase
            .from('profiles')
            .select('must_change_password')
            .eq('id', user.id)
            .single();

        if (profile?.must_change_password) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = '/reset-password';
            return NextResponse.redirect(redirectUrl);
        }
    }

    return supabaseResponse;
}
