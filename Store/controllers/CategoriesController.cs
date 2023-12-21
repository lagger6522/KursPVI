using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Store.DAL;
using Store.Model;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.IO;


namespace Store.controllers
{
	public class CategoriesController : ControllerBase
	{
		private readonly ApplicationDbContext _context;

		public CategoriesController(ApplicationDbContext context)
		{
			_context = context;
		}

		[HttpPost]
		public async Task<IActionResult> AddReview(ProductReview review)
		{
			try
			{				
				// Задаем дату отзыва
				review.ReviewDate = DateTime.Now;

				// Добавляем отзыв в базу данных
				_context.ProductReviews.Add(review);
				await _context.SaveChangesAsync();

				return Ok("Отзыв успешно добавлен.");
			}
			catch (Exception ex)
			{
				// Обработка ошибок, если необходимо
				return StatusCode(500, $"Внутренняя ошибка сервера: {ex.Message}");
			}
		}

		[HttpGet]		
		public IActionResult GetProductDetails(int productId)
		{
			try
			{
				var product = _context.Products
					.FirstOrDefault(p => p.ProductId == productId);

				if (product == null)
				{
					return NotFound(new { message = "Товар не найден." });
				}

				return Ok(product);
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = $"Ошибка при получении деталей товара: {ex.Message}" });
			}
		}


		[HttpDelete]
		public IActionResult RemoveProduct(int productId)
		{
			try
			{
				// Находим товар по ID
				var product = _context.Products.Find(productId);

				if (product == null)
				{
					return NotFound(new { message = "Товар не найден." });
				}

				// Удаление товара
				_context.Products.Remove(product);
				_context.SaveChanges();

				return Ok(new { message = "Товар успешно удален." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = $"Ошибка при удалении товара: {ex.Message}" });
			}
		}

		[HttpPut]
		public IActionResult EditProduct(int productId, [FromBody] Product model)
		{
			try
			{
				// Поиск товара по ID
				var product = _context.Products.FirstOrDefault(p => p.ProductId == productId);

				if (product == null)
				{
					return NotFound(new { message = "Товар не найден." });
				}

				// Обновление данных товара
				product.ProductName = model.ProductName;
				product.Description = model.Description;
				product.Image = model.Image;
				product.Price = model.Price;
				// Сохранение изменений в базе данных
				_context.SaveChanges();

				return Ok(new { message = "Товар успешно обновлен." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = $"Ошибка при обновлении товара: {ex.Message}" });
			}
		}

		[HttpDelete]
		public IActionResult RemoveSubcategory(int subcategoryId)
		{
			try
			{
				// Находим подкатегорию по ID
				var subcategory = _context.Subcategories.Include(s => s.Products)
									 .FirstOrDefault(s => s.SubcategoryId == subcategoryId);

				if (subcategory == null)
				{
					return NotFound(new { message = "Подкатегория не найдена." });
				}

				// Удаление всех товаров, связанных с подкатегорией
				_context.Products.RemoveRange(subcategory.Products);

				// Удаление подкатегории
				_context.Subcategories.Remove(subcategory);

				_context.SaveChanges();

				return Ok(new { message = "Подкатегория и товары успешно удалены." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = $"Ошибка при удалении подкатегории: {ex.Message}" });
			}
		}

		[HttpPut]
		public async Task<IActionResult> EditSubcategory(int subcategoryId, [FromBody] Subcategory SubcategoryName)
		{
			try
			{
				var existingSubcategory = await _context.Subcategories
					.FirstOrDefaultAsync(c => c.SubcategoryId == subcategoryId);

				if (existingSubcategory == null)
				{
					return NotFound(new { message = "Подкатегория не найдена." });
				}

				// Обновляем данные категории
				existingSubcategory.SubcategoryName = SubcategoryName.SubcategoryName;

				// Сохраняем изменения
				await _context.SaveChangesAsync();

				return Ok(new { message = "Подкатегория успешно обновлена." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = $"Ошибка при обновлении подкатегории: {ex.Message}" });
			}
		}

		[HttpDelete]
		public IActionResult RemoveCategory(int categoryId)
		{
			try
			{
				// Находите категорию по ID
				var category = _context.ProductCategories.Include(c => c.Subcategories).ThenInclude(s => s.Products)
									 .FirstOrDefault(c => c.CategoryId == categoryId);

				if (category == null)
				{
					return NotFound(new { message = "Категория не найдена." });
				}

				// Удаление всех товаров, связанных с подкатегориями
				foreach (var subcategory in category.Subcategories)
				{
					_context.Products.RemoveRange(subcategory.Products);
				}

				// Удаление подкатегорий
				_context.Subcategories.RemoveRange(category.Subcategories);

				// Удаление категории
				_context.ProductCategories.Remove(category);

				_context.SaveChanges();

				return Ok(new { message = "Категория, подкатегории и товары успешно удалены." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = $"Ошибка при удалении категории: {ex.Message}" });
			}
		}

		
		[HttpPut]
		public async Task<IActionResult> EditCategory(int categoryId, [FromBody] ProductCategory CategoryName)
		{
			try
			{
				// Находим категорию по ID
				var existingCategory = await _context.ProductCategories
					.FirstOrDefaultAsync(c => c.CategoryId == categoryId);

				if (existingCategory == null)
				{
					return NotFound(new { message = "Категория не найдена." });
				}

				// Обновляем данные категории
				existingCategory.CategoryName = CategoryName.CategoryName;

				// Сохраняем изменения
				await _context.SaveChangesAsync();

				return Ok(new { message = "Категория успешно обновлена." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = $"Ошибка при обновлении категории: {ex.Message}" });
			}
		}

		[HttpPost]
		public async Task<IActionResult> CreateProduct(
			[FromForm] string productName, [FromForm] string description, [FromForm] decimal price, [FromForm] int subcategoryId, [FromForm] IFormFile? image)
		{
			try
			{

				Product product = new Product();
				product.ProductName = productName;
				product.Description = description;
				product.Price = price;
				product.SubcategoryId = subcategoryId;
				product.Image = $"/images/{image.FileName}";
				using (Stream fileStream = new FileStream("ClientApp/public" + product.Image, FileMode.Create))
				{
					await image.CopyToAsync(fileStream);
				}
				_context.Products.Add(product);
				await _context.SaveChangesAsync();


				return Ok(new { message = "Товар успешно создан." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return Problem($"Ошибка при создании товара: {ex.Message}");
			}
		}

		[HttpPost]
		public async Task<IActionResult> CreateSubcategory([FromBody] Subcategory subcategory)
		{
			try
			{
				// Проверка наличия подкатегории с таким же названием в базе данных
				var existingSubcategory = await _context.Subcategories
					.FirstOrDefaultAsync(s => s.SubcategoryName == subcategory.SubcategoryName && s.ParentCategoryId == subcategory.ParentCategoryId);

				if (existingSubcategory != null)
				{
					// Подкатегория с таким названием уже существует для данной категории
					return BadRequest(new { message = "Подкатегория с таким названием уже существует для данной категории." });
				}

				// Добавление новой подкатегории
				_context.Subcategories.Add(subcategory);
				await _context.SaveChangesAsync();

				return Ok(new { message = "Подкатегория успешно создана." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = "Внутренняя ошибка сервера." });
			}
		}


		[HttpPost]
		public async Task<IActionResult> CreateCategory([FromBody] ProductCategory category)
		{
			try
			{
				// Проверка наличия категории с таким же названием в базе данных
				var existingCategory = await _context.ProductCategories
					.FirstOrDefaultAsync(c => c.CategoryName == category.CategoryName);

				if (existingCategory != null)
				{
					// Категория с таким названием уже существует
					return BadRequest(new { message = "Категория с таким названием уже существует." });
				}

				// Добавление новой категории
				_context.ProductCategories.Add(category);
				await _context.SaveChangesAsync();

				return Ok(new { message = "Категория успешно создана." });
			}
			catch (Exception ex)
			{
				// Обработка ошибок
				return StatusCode(500, new { message = "Внутренняя ошибка сервера." });
			}
		}


		[HttpGet]
		public async Task<IEnumerable<Product>> GetProductsBySubcategory(int subcategoryId)
		{
			return await _context.Products.Where(p => p.SubcategoryId == subcategoryId).ToListAsync();
		}

		[HttpGet]
		public async Task<IEnumerable<ProductCategory>> GetCategories()
		{
			return await _context.ProductCategories.ToListAsync();
		}

		[HttpGet]
		public async Task<IEnumerable<Subcategory>> GetSubcategories()
		{
			return await _context.Subcategories.ToListAsync();
		}
		
		[HttpGet]
		public async Task<IEnumerable<Product>> GetProducts()
		{
			return await _context.Products.ToListAsync();
		}
	}
}
