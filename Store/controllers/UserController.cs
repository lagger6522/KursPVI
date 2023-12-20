﻿using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Store.DAL;
using Store.Domain.Model;
using Store.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace Store.controllers
{
	public class UserController : Controller
	{

		private readonly ApplicationDbContext _context;

		public UserController(ApplicationDbContext context)
		{
			_context = context;
		}
		[Authorize]
		[HttpGet]
		public IActionResult Check()
		{
			if (User.Identity == null || !User.Identity.IsAuthenticated) return Problem("Пользователь не авторизован.");
			var claim = User.Claims.Where(n => n.Type == ClaimTypes.Name || n.Type == ClaimTypes.Role)
				.Select(n => new { claim = n.Value });
			return Json(claim);
		}
		[Authorize]
		[HttpPost]
		public async Task<IActionResult> singOut()
		{
			await HttpContext.SignOutAsync();
			
			return Ok();
		}

		[HttpPost]
		public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
		{
			
			var user = _context.Users.FirstOrDefault(u => u.Email == model.Email && u.Password == HashPassword(model.Password));

			if (user == null)
			{
				return Unauthorized(new { message = "Неправильные email или пароль." });
			}

			// Генерация токена (здесь используется пример, в реальных проектах используйте библиотеки для JWT)
			var token = GenerateToken(user);
			
			ClaimsIdentity identity = new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.Name, user.Username),
				new Claim(ClaimTypes.Role, user.Role),
				// Другие необходимые клеймы
			},
			CookieAuthenticationDefaults.AuthenticationScheme);
			ClaimsPrincipal principal = new ClaimsPrincipal(identity);
			await HttpContext.SignInAsync(
			  CookieAuthenticationDefaults.AuthenticationScheme, principal);
			// Возвращение токена клиенту
			return Ok(new { token, role = user.Role });
		}

		private string GenerateToken(User user)
		{
			// Ваш код для генерации токена, например, с использованием библиотеки JWT
			// Пример использования библиотеки System.IdentityModel.Tokens.Jwt:
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes("YourSecretKeyHere"); // Замените на ваш секретный ключ
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new Claim[]
				{
					new Claim(ClaimTypes.Name, user.Username),
					new Claim(ClaimTypes.Role, user.Role),
					// Другие необходимые клеймы
				}),
				Expires = DateTime.UtcNow.AddDays(1), // Время жизни токена
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};
			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}

		[HttpPost]
		public async Task<IActionResult> Register([FromBody] RegisterModel model)
		{
			// Проверка, не существует ли уже пользователь с таким email
			if (_context.Users.Any(u => u.Email == model.Email))
			{
				ModelState.AddModelError("Email", "Пользователь с таким email уже существует.");
				//return Json(new { errors = ModelState.ToDictionary(e => e.Key, e => e.Value.Errors.Select(x => x.ErrorMessage)) });
				return Problem("Пользователь с таким email уже существует.");
			}

			// Создание нового пользователя
			var user = new User
			{
				Username = model.Name,
				Email = model.Email,
				Number = model.Phone,
				Password = HashPassword(model.Password)
			};

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return Json(new { message = "Регистрация успешна." });
		}


		private string HashPassword(string password)
		{
			// Требуется реализация метода хеширования пароля (например, с использованием библиотеки BCrypt)
			// Важно не хранить пароли в открытом виде
			// Пример: return BCrypt.Net.BCrypt.HashPassword(password);
			return password;
		}

		public async Task<IEnumerable<User>> GetUsersAsync()
		{
			return await _context.Users.ToListAsync();
		}
	}
}	